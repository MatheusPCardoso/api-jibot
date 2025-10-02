import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'

import { TransactionService } from '../services/transaction.service'
import { Update } from '../dto/transaction.dto'
import { Prisma } from '@prisma/client'

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get('/:id')
  async find(@Param('id') id: string) {
    return await this.transactionService.find(id)
  }

  @Get('/all')
  async findBy(@Query() accountId: string, @Query() providerId: string) {
    return await this.transactionService.findBy({ accountId, providerId })
  }

  @Get('/current-sales')
  async findSalesInCurrentMonth(@Query() accountId: string) {
    return await this.transactionService.findSalesInCurrentMonthByAccountId(
      accountId,
    )
  }

  @Post()
  async create(@Body() transaction: Prisma.TransactionUncheckedCreateInput) {
    return await this.transactionService.create(transaction)
  }

  @Patch()
  async updateTransactionStatus(
    @Body()
    { id, transaction }: { id: string; transaction: Update },
  ) {
    return await this.transactionService.update(id, transaction)
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.transactionService.delete(id)
  }
}
