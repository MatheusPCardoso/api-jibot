import {
  CustomerCreationError,
  CustomerSearchError,
  CustomerUpdateError,
  ParamsMissingError,
} from '@exceptions/modules/common/customer.exceptions'
import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { Customer, Prisma } from '@prisma/client'
import { FindBy } from '../types/customer.types'
import { Update } from '../dto/customer.dto'

@Injectable()
export class CustomerService {
  constructor(private readonly prismaService: PrismaService) {}

  async find(id: string): Promise<Customer> {
    try {
      return await this.prismaService.customer.findUnique({ where: { id } })
    } catch (error) {
      throw new CustomerSearchError(error)
    }
  }

  async findBy({ telegramId, accountId }: FindBy): Promise<Customer[]> {
    if (!telegramId && !accountId) {
      throw new ParamsMissingError()
    }
    try {
      return await this.prismaService.customer.findMany({
        where: {
          ...(telegramId && { telegram: { id: telegramId } }),
          ...(accountId && { accountId: accountId }),
        },
      })
    } catch (error) {
      throw new CustomerSearchError(error)
    }
  }

  async create(data: Prisma.CustomerCreateInput): Promise<Customer> {
    try {
      return await this.prismaService.customer.create({ data })
    } catch (error) {
      throw new CustomerCreationError(error)
    }
  }

  async update(id: string, data: Update): Promise<Customer> {
    try {
      return await this.prismaService.customer.update({
        where: { id },
        data,
      })
    } catch (error) {
      throw new CustomerUpdateError(error)
    }
  }

  async upsert(data: Prisma.CustomerUncheckedCreateInput): Promise<Customer> {
    try {
      return await this.prismaService.customer.upsert({
        where: {
          email_accountId: {
            email: data.email,
            accountId: data.accountId,
          },
        },
        update: data,
        create: data,
      })
    } catch (error) {
      throw new CustomerUpdateError(error)
    }
  }

  async delete(id: string): Promise<Customer> {
    return await this.prismaService.customer.delete({ where: { id } })
  }
}
