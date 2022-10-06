import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from 'src/redis/redis.module';
import { Transport, ClientsModule } from '@nestjs/microservices';
import jwtConfig from 'src/config/jwt.config';

@Module({
  imports: [UserModule, ConfigModule.forFeature(jwtConfig)],
  providers: [AuthService, PrismaService, UserService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
