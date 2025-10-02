import { Injectable } from '@nestjs/common'
import { Prisma, Subscription } from '@prisma/client'
import {
  GetExpiredSubscriptionsError,
  SetSubscriptionInactiveError,
  SubscriptionCreationError,
  SubscriptionUpdateError,
} from '@src/modules/exceptions/modules/common/subscription.exceptions'
import { differenceInCalendarDays, isBefore } from 'date-fns'
import { PrismaService } from './prisma.service'
import { Create } from '../dto/subscription.dto'

@Injectable()
export class SubscriptionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Create): Promise<Subscription> {
    try {
      return await this.prismaService.subscription.create({ data })
    } catch (error) {
      throw new SubscriptionCreationError(error)
    }
  }

  async update(
    id: string,
    data: Prisma.SubscriptionUpdateInput,
  ): Promise<Subscription> {
    try {
      return await this.prismaService.subscription.update({
        where: { id },
        data,
      })
    } catch (error) {
      throw new SubscriptionUpdateError(error)
    }
  }

  findExpiredSubscriptions(): Promise<Subscription[]> {
    try {
      return this.prismaService.subscription.findMany({
        where: {
          expiresAt: {
            lt: new Date(),
          },
        },
      })
    } catch (error) {
      throw new GetExpiredSubscriptionsError(error)
    }
  }

  async validate(accountId: string, customerId: string) {
    try {
      const subscriptions = await this.prismaService.subscription.findMany({
        where: { accountId, customerId },
      })
      return subscriptions.map((subscription) => ({
        daysLeft: differenceInCalendarDays(subscription.expiresAt, new Date()),
        isValid: isBefore(subscription.expiresAt, new Date()),
      }))
    } catch (error) {
      throw new SetSubscriptionInactiveError(error)
    }
  }
}
