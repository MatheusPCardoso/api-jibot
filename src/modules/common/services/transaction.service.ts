import { Injectable } from '@nestjs/common'
import { HistoryType, Prisma, Transaction } from '@prisma/client'
import {
  ParamsMissingError,
  TransactionCreationError,
  TransactionSearchError,
  TransactionUpdateError,
} from '@src/modules/exceptions/modules/common/transactions.exceptions'
import { PrismaService } from './prisma.service'
import { startOfMonth } from 'date-fns'
import { Update } from '../dto/transaction.dto'
import { FindBy } from '../types/transaction.types'

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    transaction: Prisma.TransactionUncheckedCreateInput,
  ): Promise<Transaction> {
    try {
      return await this.prismaService.transaction.create({
        data: transaction,
      })
    } catch (error) {
      throw new TransactionCreationError(error)
    }
  }

  async update(id: string, data: Update): Promise<Transaction> {
    try {
      let updatedStatusHistory: HistoryType[]
      if (data.status) {
        const existingTransaction =
          await this.prismaService.transaction.findUnique({
            where: { id },
          })

        if (!existingTransaction) {
          throw new TransactionUpdateError()
        }

        updatedStatusHistory = [
          ...existingTransaction.status.history,
          { value: existingTransaction.status.current, createdAt: new Date() },
        ]
      }

      return await this.prismaService.transaction.update({
        where: { id },
        data: {
          ...data,
          ...(data.status && {
            status: { current: data.status, history: updatedStatusHistory },
          }),
        },
      })
    } catch (error) {
      throw new TransactionUpdateError(error)
    }
  }

  find(id: string): Promise<Transaction> {
    return this.prismaService.transaction.findUnique({
      where: { id },
    })
  }

  async findBy({ accountId, providerId }: FindBy): Promise<Transaction[]> {
    if (!accountId && !providerId) {
      throw new ParamsMissingError()
    }
    try {
      return await this.prismaService.transaction.findMany({
        where: {
          ...(accountId && { accountId }),
          ...(providerId && { paymentProvider: { id: providerId } }),
        },
      })
    } catch (error) {
      throw new TransactionSearchError(error)
    }
  }

  async findSalesInCurrentMonthByAccountId(accountId: string): Promise<{
    pendingSales: Transaction[]
    completedSales: Transaction[]
    monthlyRevenue: number
  }> {
    const startOfMonthDate = startOfMonth(new Date())
    try {
      const salesInMonth = await this.prismaService.transaction.findMany({
        where: {
          accountId,
          createdAt: {
            gte: startOfMonthDate,
          },
        },
      })
      const pendingSales = salesInMonth.filter(
        (sale) => sale.status.current === 'PENDING',
      )
      const completedSales = salesInMonth.filter(
        (sale) => sale.status.current === 'SUCCESS',
      )
      const monthlyRevenue = salesInMonth.reduce(
        (sum, sale) => sum + sale.amount,
        0,
      )
      return {
        pendingSales,
        completedSales,
        monthlyRevenue: monthlyRevenue * 0.01,
      }
    } catch (error) {
      throw new TransactionSearchError(error)
    }
  }

  async delete(id: string): Promise<Transaction> {
    return await this.prismaService.transaction.delete({
      where: { id },
    })
  }
}
