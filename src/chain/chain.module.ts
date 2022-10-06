import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChainService } from './chain.service';
import { ChainController } from './chain.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [ConfigModule, AuthModule, UserModule],
  providers: [ChainService, PrismaService],
  controllers: [ChainController],
})
export class ChainModule {}
