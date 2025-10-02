import { Module } from '@nestjs/common'
import { PaymentsController } from '@payments/controllers/payments.controller'
import { PaymentsService } from './services/payments.service'
import { CommonModule } from '@common/common.module'
import { TransactionService } from '@common/services/transaction.service'
import { MercadoPagoModule } from '../mercado-pago/mercado-pago.module'

@Module({
  imports: [CommonModule, MercadoPagoModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, TransactionService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
