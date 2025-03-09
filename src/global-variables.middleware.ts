import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class GlobalVariablesMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req.cookies.token
    const admin = req.cookies.token
    res.locals.admin = admin;
    next();
  }
}
