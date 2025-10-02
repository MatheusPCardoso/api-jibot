import { Injectable } from '@nestjs/common'
import { PrismaService } from '@src/modules/common/services/prisma.service'
import { MercadoPagoService } from '@src/modules/mercado-pago/services/mercado-pago.service'
import { PlanNotFoundError } from '@src/modules/exceptions/modules/plans'
import { CustomerService } from '@src/modules/common/services/customer.service'
import { TransactionService } from '@src/modules/common/services/transaction.service'
import { StatusValue } from '@prisma/client'
import { CreatePlanPaymentDto } from '../dtos/create-plan-payment.dto'

@Injectable()
export class PaymentsService {
  constructor(
    private prismaService: PrismaService,
    private mercadoPagoService: MercadoPagoService,
    private customerService: CustomerService,
    private transactionService: TransactionService,
  ) {}

  async createPlanPayment({
    product,
    quantity,
    userNumber,
  }: CreatePlanPaymentDto) {
    const plan = await this.prismaService.plan.findFirst({
      where: { id: product },
    })

    if (!plan) {
      throw new PlanNotFoundError()
    }
    const accessToken = await this.mercadoPagoService.getMercadoPagoSellerToken(
      plan.accountId,
    )
    const userEmail = `${userNumber}@telegram-jibot.com.br`

    const mercadoPagoUser =
      await this.mercadoPagoService.createMercadoPagoCustomer({
        name: userNumber,
        email: userEmail,
      })

    const customer = await this.customerService.upsert({
      accountId: plan.accountId,
      email: userEmail,
      firstName: userNumber,
      lastName: userNumber,
      paymentProviderInfo: { set: { id: mercadoPagoUser.id } },
      contactInfo: { set: { telegram: { id: userNumber } } },
    })

    const transaction = await this.transactionService.create({
      accountId: plan.accountId,
      amount: plan.amount,
      customerId: customer.id,
      status: { current: StatusValue.PENDING, history: [] },
    })

    return await this.mercadoPagoService.createMercadoPagoOrder({
      accessToken: accessToken,
      productId: plan.id,
      productPrice: plan.amount,
      productQuantity: parseInt(quantity),
      productTitle: plan.name,
      transactionId: transaction.id,
      productDescription: plan.description,
      payerName: mercadoPagoUser.first_name,
    })
  }
}
