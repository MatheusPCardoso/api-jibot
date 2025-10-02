import {
  AccountCreationError,
  AccountSearchError,
} from '@exceptions/modules/common/account.exceptions'
import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { Account } from '@prisma/client'
import { FindBy } from '../types/account.types'
import { Create, Update } from '../dto/account.dto'

@Injectable()
export class AccountService {
  constructor(private readonly prismaService: PrismaService) {}

  async find({ id }: { id: string }): Promise<Account> {
    try {
      return await this.prismaService.account.findUnique({
        where: { id },
      })
    } catch (error) {
      throw new AccountSearchError(error)
    }
  }

  async findBy({ planId }: FindBy): Promise<Account[]> {
    try {
      return await this.prismaService.account.findMany({
        where: {
          plan: { some: { id: planId } },
        },
      })
    } catch (error) {
      throw new AccountSearchError(error)
    }
  }

  async findAccountsByUserId(id: string): Promise<Account[]> {
    try {
      const accountIds = await this.prismaService.user.findUnique({
        where: { id },
        select: { accountIds: true },
      })
      if (!accountIds) return []

      return await this.prismaService.account.findMany({
        where: {
          id: { in: accountIds.accountIds },
        },
      })
    } catch (error) {
      throw new AccountSearchError(error)
    }
  }

  async create(data: Create): Promise<Account> {
    try {
      return await this.prismaService.account.create({ data })
    } catch (error) {
      throw new AccountCreationError(error)
    }
  }

  async update(id: string, data: Update): Promise<Account> {
    try {
      return await this.prismaService.account.update({
        where: { id },
        data,
      })
    } catch (error) {
      throw new AccountCreationError(error)
    }
  }

  async delete(id: string): Promise<Account> {
    try {
      return await this.prismaService.account.delete({
        where: { id },
      })
    } catch (error) {
      throw new AccountSearchError(error)
    }
  }
}
