import { HttpException, Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class ExtractUserIdMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}
  async use(req: any, res: any, next: () => void) {
    console.log('🚀 ~ file: extract-user-id.middleware.ts ~ line 6 ~ ExtractUserIdMiddleware ~ use ~ req', req.cookies);
    const token = req.cookies.authorization;
    console.log('🚀 ~ file: extract-user-id.middleware.ts ~ line 10 ~ ExtractUserIdMiddleware ~ use ~ token', token);
    try {
      if (token) {
        const decoded = await this.authService.decodeJwt(token);
        console.log(
          '🚀 ~ file: extract-user-id.middleware.ts ~ line 12 ~ ExtractUserIdMiddleware ~ use ~ decoded',
          decoded,
        );
        req.body.userId = decoded['id'];
      }
    } catch (e) {
      throw new HttpException(`users's phone already exists`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    next();
  }
}
