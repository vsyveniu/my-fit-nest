import { Controller, Get, Req, UseGuards, Body } from '@nestjs/common';
import { ChainService } from './chain.service';
import { IsAuthenticatedGuard } from 'src/guards/is-authenticated.guard';
import { JwtUser, RequestWithId } from 'src/types/types';

@Controller('chain')
export class ChainController {
  constructor(private readonly chainService: ChainService) {}

  @Get('')
  @UseGuards(IsAuthenticatedGuard)
  async get(@Body() jwtUser: JwtUser): Promise<any> {
    return this.chainService.get(jwtUser.userId);
  }
}
