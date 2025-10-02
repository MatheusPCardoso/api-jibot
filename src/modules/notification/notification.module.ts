import { CommonModule } from '@common/common.module'
import { Module } from '@nestjs/common'
import { RedisModule } from '@redis/redis.module'

import { NotificationController } from './controllers/notification.controller'
import { SubscriptionCronController } from './controllers/subscription-cron.controller'
import { NotificationService } from './services/notification.service'
import { SubscriptionCronService } from './services/subscription-cron.service'
import { TelegramModule } from '../telegram/telegram.module'

@Module({
  imports: [CommonModule, RedisModule, TelegramModule],
  providers: [NotificationService, SubscriptionCronService],
  controllers: [NotificationController, SubscriptionCronController],
})
export class NotificationModule {}
