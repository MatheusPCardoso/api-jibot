import { CustomerNotFoundError } from '@exceptions/modules/common/customer.exceptions'
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common'

import { CustomerService } from '../services/customer.service'
import { Update } from '../dto/customer.dto'
import { Prisma } from '@prisma/client'

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get('/:id')
  async find(@Query('id') id: string) {
    const customer = await this.customerService.find(id)
    if (!customer) {
      throw new CustomerNotFoundError()
    }
    return customer
  }

  @Get()
  async findBy(
    @Query('telegramId') telegramId: string,
    @Query('accountId') accountId: string,
  ) {
    const customer = await this.customerService.findBy({
      telegramId,
      accountId,
    })
    if (!customer) {
      throw new CustomerNotFoundError()
    }
    return customer
  }

  @Post()
  async create(@Body() customer: Prisma.CustomerCreateInput) {
    return await this.customerService.create(customer)
  }

  @Patch('/:id')
  async update(@Query('id') id: string, @Body() customer: Update) {
    return await this.customerService.update(id, customer)
  }

  @Delete('/:id')
  async delete(@Query('id') id: string) {
    return await this.customerService.delete(id)
  }
}
