import { PlanService } from '@src/modules/common/services/plan.service'
import {
  PlanNotFoundError,
  PlansNotFoundError,
} from '@exceptions/modules/plans'
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { Create, Update } from '../dto/plan.dto'

@Controller('plans')
export class PlanController {
  constructor(private readonly plansService: PlanService) {}

  @Get('/:id')
  async find(@Query('id') id: string) {
    const plans = await this.plansService.find(id)
    if (!plans) throw new PlansNotFoundError()
    return plans
  }

  @Get('/all')
  async findBy(@Query('accountId') accountId: string) {
    const plan = await this.plansService.findBy({ accountId })
    if (!plan) throw new PlanNotFoundError()
    return plan
  }

  @Post()
  async create(@Body() plan: Create) {
    return await this.plansService.create(plan)
  }

  @Patch('/:id')
  async update(@Query('id') id: string, @Body() plan: Update) {
    return await this.plansService.update(id, plan)
  }

  @Delete('/:id')
  async delete(@Query('id') id: string) {
    return await this.plansService.delete(id)
  }
}
