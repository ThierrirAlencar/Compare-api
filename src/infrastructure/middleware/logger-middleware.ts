
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class loggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request: ${req.method} ${req.url}, Body: ${JSON.stringify(req.body)}, Params: ${JSON.stringify(req.params)}`);
    next();
  }
}
