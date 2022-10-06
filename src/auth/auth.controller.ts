import { Controller, Get, HttpException, Post, Body, Headers, Res, Req, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { IsAuthenticatedGuard } from 'src/guards/is-authenticated.guard';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() userDto: UserDto,
    @Headers() headers,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Object | HttpException> {
    return this.authService.login(userDto, response);
  }
  @Get('checkToken')
  @UseGuards(IsAuthenticatedGuard)
  async check(@Headers() headers, @Req() req: Request): Promise<string> {
    return 'K';
  }

  /*   @Post('refresh')
  async refresh(@Body() email: number, @Req() req: Request) {
    return this.authService.refresh(email, req.cookies);
  } */

  @Post('logout')
  @UseGuards(IsAuthenticatedGuard)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<boolean> {
    return this.authService.logout(req, res);
  }

  @Post('register')
  async register(@Body() userDto: UserDto, @Res({ passthrough: true }) response: Response) {
    return this.authService.register(userDto, response);
  }

  @Post('makePassword')
  async makePassword(@Body() passwordBody: string): Promise<string> {
    return this.authService.makePassword(passwordBody['password']);
  }
}
