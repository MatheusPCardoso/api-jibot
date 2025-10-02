import { Body, Controller, Post } from '@nestjs/common'

import { PaymentsService } from '@payments/services/payments.service'
import { Public } from '@src/constants'
import { ContextDto } from '../dtos/context.dto'

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Public()
  @Post('/plan')
  async createPlanPaymentLink(@Body() body: ContextDto) {
    return await this.paymentsService.createPlanPayment({
      product: body.context.product,
      quantity: body.context.quantity,
      userNumber: body.context.chat.number,
    })
  }
}
