import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { UserAuth } from 'src/types/types';
import { User } from 'prisma/prisma-client';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { createClient } from 'redis';
import jwtConfig from 'src/config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    //private configService: ConfigService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async login(userDto: UserDto, res: any): Promise<Partial<User> | HttpException> {
    try {
      const user = await this.userService.findUnique(userDto.email);

      if (!user) {
        return new HttpException(`user not found`, HttpStatus.NOT_FOUND);
      }

      const isPasswordOk = await bcrypt.compare(userDto.password, user.password);

      if (!isPasswordOk) {
        return new HttpException(`incorrect password! You are going to jail!`, HttpStatus.FORBIDDEN);
      }

      const accessToken = await this.signJWT({ id: user.id, email: user.email }, this.jwtConfiguration.expires);

      const refreshToken = await this.signJWT(
        { id: user.id, email: user.email },
        this.jwtConfiguration.refreshTokenExpires,
      );

      const redis = createClient();
      await redis.connect();

      await redis.set(`${user.email}_token`, refreshToken);

      res.cookie('authorization', accessToken, { domain: 'localhost', path: '/' });
      res.cookie('refreshauth', refreshToken, { domain: 'localhost', path: '/', secure: true, httpOnly: true });

      return { id: user.id, email: user.email };
    } catch (e) {
      throw new HttpException(`error in user login ${e?.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async register(userDto: UserDto, res: any): Promise<Partial<User> | HttpException> {
    try {
      let user: any | HttpException = await this.userService.findUnique(userDto.email);

      if (user) {
        return new HttpException('user already exists', HttpStatus.FORBIDDEN);
      }

      const password = await this.makePassword(userDto.password);

      userDto.password = password;

      user = await this.userService.create(userDto);

      const accessToken = await this.signJWT({ id: user.id, email: user.email }, this.jwtConfiguration.expires);

      const refreshToken = await this.signJWT(
        { id: user.id, email: user.email },
        this.jwtConfiguration.refreshTokenExpires,
      );

      const redis = createClient();
      await redis.connect();

      await redis.set(`${user.email}_token`, refreshToken);

      res.cookie('authorization', accessToken, { domain: 'localhost', path: '/' });
      res.cookie('refreshauth', refreshToken, { domain: 'localhost', path: '/', secure: true, httpOnly: true });

      return { id: user.id, email: user.email };
    } catch (e) {
      throw new HttpException(`${e?.message}`, e.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async refresh(token: string, user: any): Promise<any> {
    try {
      // const user = await this.userService.findUnique(email);
      const redis = await createClient();
      await redis.connect();

      let cachedToken = await redis.get(`${user.email}_token`);
      if (!cachedToken || cachedToken != token) {
        throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
      }

      const accessToken = await this.signJWT({ id: user.id, email: user.email }, this.jwtConfiguration.expires);

      const refreshToken = await this.signJWT(
        { id: user.id, email: user.email },
        this.jwtConfiguration.refreshTokenExpires,
      );

      cachedToken = await redis.set(`${user.email}_token`, refreshToken);

      return { access: accessToken, refresh: refreshToken };
    } catch (e) {
      throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  async logout(req: any, res: any): Promise<any> {
    res.clearCookie('authorization');
    res.clearCookie('refreshauth');

    const redis = await createClient();
    await redis.connect();

    return 'fuck';
  }

  async signJWT(data, expiresIn: string): Promise<string> {
    const token = await jwt.sign(data, this.jwtConfiguration.secret, { expiresIn });
    return token;
  }
  async decodeJwt(token: string): Promise<object> {
    return await jwt.decode(token);
  }

  async makePassword(password: string): Promise<string> {
    try {
      const hash = await bcrypt.hash(password, 10);
      return hash;
    } catch (e) {
      throw new HttpException(`error in making password ${e?.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
