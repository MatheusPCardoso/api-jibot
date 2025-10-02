import { RedisModule as LiaoModule } from '@liaoliaots/nestjs-redis'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { RedisController } from './controllers/redis.controller'
import { RedisService } from './services/redis.service'

@Module({
  imports: [
    ConfigModule.forRoot(),
    LiaoModule.forRoot({
      config: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
    }),
  ],
  providers: [RedisService],
  controllers: [RedisController],
  exports: [RedisService],
})
export class RedisModule {}
