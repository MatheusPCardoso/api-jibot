import { AuthModule } from '@auth/auth.module'
import { CommonModule } from '@common/common.module'
import { ExceptionsModule } from '@exceptions/exceptions.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { NotificationModule } from '@notification/notification.module'
import { PaymentsModule } from '@payments/payments.module'
import { TelegramModule } from '@telegram/telegram.module'
import { WebModule } from '@web/web.module'
import { FilesModule } from './modules/files/files.module'

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PaymentsModule,
    NotificationModule,
    AuthModule,
    ExceptionsModule,
    WebModule,
    TelegramModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
