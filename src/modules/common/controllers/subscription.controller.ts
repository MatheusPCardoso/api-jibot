import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common'

import { SubscriptionService } from '../services/subscription.service'
import { Create, Update } from '../dto/subscription.dto'

@Controller('subscription')
export class SubscriptionController {
  constructor(private subscriptionService: SubscriptionService) {}

  @Post()
  async create(@Body() subscription: Create) {
    return await this.subscriptionService.create(subscription)
  }

  @Patch()
  async update(
    @Body()
    { id, subscription }: { id: string; subscription: Update },
  ) {
    return await this.subscriptionService.update(id, subscription)
  }

  @Get('/customer/by-account')
  async validate(
    @Query('accountId') accountId: string,
    @Query('customerId') customerId: string,
  ) {
    return await this.subscriptionService.validate(accountId, customerId)
  }

  @Get('/expired')
  async findExpiredSubscriptions() {
    return await this.subscriptionService.findExpiredSubscriptions()
  }
}
