import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
//import { RedisModule } from './redis/redis.module';
import { ChainModule } from './chain/chain.module';
import { ExtractUserIdMiddleware } from './middlewares/extract-user-id.middleware';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import appConfig from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    UserModule,
    AuthModule,
    ChainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExtractUserIdMiddleware).forRoutes('chain');
  }
}
