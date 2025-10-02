import { Injectable } from '@nestjs/common'
import { CustomerService } from '@src/modules/common/services/customer.service'
import { TransactionService } from '@src/modules/common/services/transaction.service'

import { Transaction } from '@prisma/client'
import { PrismaService } from '@src/modules/common/services/prisma.service'

@Injectable()
export class DashboardService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly transactionService: TransactionService,
    private readonly prismaService: PrismaService,
  ) {}

  async getHomeInfo(accountId: string) {
    const accountCustomers = await this.customerService.findBy({ accountId })
    const { completedSales, monthlyRevenue, pendingSales } =
      await this.transactionService.findSalesInCurrentMonthByAccountId(
        accountId,
      )
    return {
      totalClients: accountCustomers.length,
      monthlyRevenue,
      monthlySales: completedSales.length,
      totalMonthlyPendingSales: pendingSales.length,
    }
  }

  async getTransactions(
    accountId: string,
    page: number = 1,
    pageSize: number = 10,
  ): Promise<{
    transactions: Transaction[]
    totalCount: number
  }> {
    const skip = (page - 1) * pageSize
    const transactions = await this.prismaService.transaction.findMany({
      where: { accountId },
      take: pageSize,
      skip: skip,
      orderBy: { createdAt: 'desc' },
    })
    const totalCount = await this.prismaService.transaction.count({
      where: { accountId },
    })

    return { transactions, totalCount }
  }
}
