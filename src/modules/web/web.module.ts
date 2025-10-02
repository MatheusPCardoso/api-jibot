import { Module } from '@nestjs/common'
import { DashboardService } from './dashboard/services/dashboard.service'
import { DashboardController } from './dashboard/controllers/dashboard.controller'
import { CommonModule } from '@common/common.module'
import { AuthModule } from '@auth/auth.module'
import { RedisModule } from '@redis/redis.module'

@Module({
  imports: [CommonModule, AuthModule, RedisModule],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class WebModule {}
