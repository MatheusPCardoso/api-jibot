import { Controller, Get, Query, Request } from '@nestjs/common'

import { DashboardService } from '../services/dashboard.service'
import { MissingAccountError } from '@src/modules/exceptions/modules/common/account.exceptions'

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('/account')
  async getHomeInfo(
    @Request()
    { user: { accountId } }: { user: { accountId: string } },
  ) {
    return await this.dashboardService.getHomeInfo(accountId)
  }

  @Get('/orders')
  async getOrders(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Request() { user: { accountId } }: { user: { accountId: string } },
  ) {
    if (!accountId) throw new MissingAccountError()
    return await this.dashboardService.getTransactions(
      accountId,
      page,
      pageSize,
    )
  }
}
