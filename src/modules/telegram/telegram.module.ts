import { Module } from '@nestjs/common'
import { CommonModule } from '../common/common.module'
import { TelegramCommunicationService } from './services/telegram-communication.service'
import { RedisModule } from '../redis/redis.module'

@Module({
  imports: [CommonModule, RedisModule],
  controllers: [],
  providers: [TelegramCommunicationService],
  exports: [TelegramCommunicationService],
})
export class TelegramModule {}
