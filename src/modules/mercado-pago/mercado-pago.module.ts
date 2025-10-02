import { Module } from '@nestjs/common'
import { MercadoPagoController } from './controllers/mercado-pago.controller'
import { MercadoPagoService } from './services/mercado-pago.service'
import { CommonModule } from '../common/common.module'

@Module({
  controllers: [MercadoPagoController],
  providers: [MercadoPagoService],
  exports: [MercadoPagoService],
  imports: [CommonModule],
})
export class MercadoPagoModule {}
