import { DynamicModule, FactoryProvider, ModuleMetadata } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import IORedis, { Redis, RedisOptions } from 'ioredis';
import { Transport, MicroserviceOptions, ClientsModule } from '@nestjs/microservices';

/* export const IORedisKey = 'IORedis';

type RedisModuleOptions = {
  connectionOptions: RedisOptions;
  onClientReady?: (client: Redis) => void;
};

type RedisAsyncModuleOptions = {
  useFactory: (
    ...args: any[]
  ) => Promise<RedisModuleOptions> & Pick<ModuleMetadata, 'imports'> & Pick<FactoryProvider, 'inject'>;
};

@Module({})
export class RedisModule {
  static async registerAsync({ useFactory, imports, inject }): Promise<DynamicModule> {
    const redisProvider = {
      provide: IORedisKey,
      useFactory: async (...args) => {
        const { connectionOptions, onClientReady } = await useFactory(...args);
        const client = await new IORedis(connectionOptions);

        onClientReady(client);
        return client;
      },
      inject,
    };
    return {
      module: RedisModule,
      imports: [ConfigModule],
      providers: [redisProvider],
      exports: [redisProvider],
    };
  }
} */

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'REDIS',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
  ],
})
export class RedisModule {}
