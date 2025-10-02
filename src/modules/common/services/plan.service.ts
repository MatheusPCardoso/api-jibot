import {
  ParamsMissingError,
  PlanCreationError,
  PlanSearchError,
  PlansSearchError,
} from '@exceptions/modules/plans'
import { Injectable } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { Plan } from '@prisma/client'
import { FindBy } from '../types/plans.types'
import { Create, Update } from '../dto/plan.dto'

@Injectable()
export class PlanService {
  constructor(private readonly prismaService: PrismaService) {}

  async find(id: string): Promise<Plan> {
    try {
      return await this.prismaService.plan.findUnique({ where: { id } })
    } catch (error) {
      throw new PlanSearchError(error)
    }
  }

  async findBy({ accountId }: FindBy): Promise<Plan[]> {
    try {
      if (!accountId) {
        throw new ParamsMissingError()
      }
      return await this.prismaService.plan.findMany({
        where: {
          ...(accountId && { accountId }),
        },
      })
    } catch (error) {
      throw new PlansSearchError(error)
    }
  }

  async create(data: Create): Promise<Plan> {
    try {
      return await this.prismaService.plan.create({ data })
    } catch (error) {
      throw new PlanCreationError(error)
    }
  }

  async update(id: string, data: Update): Promise<Plan> {
    try {
      return await this.prismaService.plan.update({ where: { id }, data })
    } catch (error) {
      throw new PlanCreationError(error)
    }
  }

  async delete(id: string): Promise<Plan> {
    try {
      return await this.prismaService.plan.delete({ where: { id } })
    } catch (error) {
      throw new PlanCreationError(error)
    }
  }
}
