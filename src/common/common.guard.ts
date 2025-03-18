import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AccountService } from 'src/account/account.service'

@Injectable()
export class CommonGuard implements CanActivate {
  constructor (
    private reflector: Reflector, // Reflector để kiểm tra @Public()
    private authService: AccountService
  ) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    // Kiểm tra xem route có @Public() không
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler()
    )
    const banVe = this.reflector.get<boolean>('isBanVe', context.getHandler())
    const soatVe = this.reflector.get<boolean>('isSoatVe', context.getHandler())
    if (isPublic) {
      return true
    }

    const request = context.switchToHttp().getRequest()

    // Kiểm tra xem cookie có tồn tại không
    if (!request.cookies || !request.cookies.token) {
      throw new UnauthorizedException('Bạn chưa đăng nhập!')
    }

    const token = request.cookies.token

    // Giải mã token
    const user = await this.authService.payload(token)
    if (!user) {
      throw new UnauthorizedException('Token không hợp lệ!')
    }
    if (user.role === 'admin') {
      return true
    }
    if (!banVe && user.role === 'banVe') {
      return false
    }
    if (!soatVe && user.role === 'soatVe') {
      return false
    }
    request.user = user
    return true
  }
}
