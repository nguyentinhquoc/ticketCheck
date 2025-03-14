import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class GlobalVariablesMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    req.cookies.token
    const login = req.cookies.token
    res.locals.login = login;
    next();
  }
}
