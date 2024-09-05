import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    const ip = req.ip;

    const startTime = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      const responseTime = Date.now() - startTime;

      this.logger.log(
        //`${method} ${originalUrl} ${statusCode} - ${contentLength || 0}b sent - ${responseTime}ms - IP: ${ip} - UserAgent: ${userAgent}`,
        `${method} ${originalUrl} ${statusCode} - ${
          contentLength || 0
        }b sent - ${responseTime}ms - IP: ${ip}`,
      );
    });

    next();
  }
}
