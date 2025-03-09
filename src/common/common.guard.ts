import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountService } from 'src/account/account.service';

@Injectable()
export class CommonGuard implements CanActivate {
  constructor(
    private reflector: Reflector, // Reflector để kiểm tra @Public()
    private authService: AccountService
  ) { }

  canActivate(context: ExecutionContext): boolean {
    // Kiểm tra xem route có @Public() không
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true; // Bỏ qua bảo vệ nếu có @Public()
    }

    const request = context.switchToHttp().getRequest();

    // Kiểm tra xem cookie có tồn tại không
    if (!request.cookies || !request.cookies.token) {
      throw new UnauthorizedException('Bạn chưa đăng nhập!');
    }

    const token = request.cookies.token;

    // Giải mã token
    const user = this.authService.payload(token);
    if (!user) {
      throw new UnauthorizedException('Token không hợp lệ!');
    }

    request.user = user; // Lưu thông tin user vào request
    return true;
  }
}
