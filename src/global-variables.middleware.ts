import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AccountService } from './account/account.service';
import { User } from './user/entities/user.entity';

@Injectable()
export class GlobalVariablesMiddleware implements NestMiddleware {
  constructor(private readonly authService: AccountService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.token;
    if (token) {
      const user = await this.authService.payload(token);
      res.locals.user = user;
      res.locals.login = req.cookies.token;
      res.locals.role = user.role;
      res.locals.avatarLocal = 'avatar';
    }
    next();
  }
}
