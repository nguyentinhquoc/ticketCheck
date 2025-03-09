import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Req,
  Res,
  Query
} from '@nestjs/common'
import * as QRCode from 'qrcode'
const bcrypt = require('bcrypt')
const saltRounds = 10
import { AccountService } from './account.service'
import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateAccountDto } from './dto/update-account.dto'
import { Response } from 'express'
import { Public } from 'src/decorators/public.decorator'

@Controller('admin')
export class AccountController {
  constructor (private readonly accountService: AccountService) {}
  @Public()
  @Get('login')
  @Render('admin/login')
  loginG(@Query('error') error?: string ) {
    return { error }
  }
  @Public()
  @Post('login')
  @Render('admin/login')
  async loginP(@Body() body, @Res() res: Response) {
    const account = await this.accountService.findWUserName(body.user_name);
    // Kiểm tra tài khoản có tồn tại không
    if (!account) {
      return res.redirect(`/admin/login?error=user`);
    }
    // So sánh mật khẩu (bcrypt.compare trả về Promise, nên cần await)
    const isMatch = await bcrypt.compare(body.password, account.password);
    if (!isMatch) {
      return res.redirect(`/admin/login?error=pass`);
    }
    // Nếu đăng nhập thành công, tạo JWT
    const user = { id: account.id, user_name: account.user_name };
    const token = await this.accountService.createToken(user);
    // Set cookie với token
    res.cookie('token', token, {
      httpOnly: true, // Ngăn JavaScript truy cập cookie (bảo mật)
      secure: false, // Đặt true nếu dùng HTTPS
      sameSite: 'strict', // Chống CSRF
      maxAge: 3 * 60 * 60 * 1000, // Hết hạn sau 3 giờ
    });
    return res.redirect(`/`);
  }
}
