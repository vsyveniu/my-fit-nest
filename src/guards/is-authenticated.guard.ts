import { CanActivate, ExecutionContext, HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private readonly configService: ConfigService, private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // const response = context.switchToHttp().getResponse();
    const headers = request.headers;

    let token = null;
    let refresh = null;
    switch (headers.app) {
      case 'web': {
        token = request.cookies.authorization;
        refresh = request.cookies.refreshauth;

        break;
      }
      default: {
        throw new HttpException(`unauthorized`, HttpStatus.UNAUTHORIZED);
      }
    }

    try {
      jwt.verify(token, this.configService.get('JWT_SECRET'));
    } catch (e) {
      try {
        const decoded = jwt.verify(refresh, this.configService.get('JWT_SECRET'));

        const newPair = await this.authService.refresh(refresh, decoded);

        request.res.cookie('authorization', newPair['access'], { domain: 'localhost', path: '/' });
        request.res.cookie('refreshauth', newPair['refresh'], {
          domain: 'localhost',
          path: '/',
          secure: true,
          httpOnly: true,
        });

        return true;
      } catch (e) {
        throw new HttpException(`unauthorized`, HttpStatus.UNAUTHORIZED);
      }
    }

    return true;
  }
}
