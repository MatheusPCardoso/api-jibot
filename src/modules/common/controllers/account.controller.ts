import { AccountService } from '@common/services/account.service'
import { AccountNotFoundError } from '@exceptions/modules/common/account.exceptions'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common'
import { Create, Update } from '../dto/account.dto'
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get('/id/:id')
  async find(@Param('id') id: string) {
    const account = await this.accountService.find({ id })
    if (!account) throw new AccountNotFoundError()

    return account
  }

  @Get('/all')
  async findAllBy(@Query('planId') planId: string) {
    return await this.accountService.findBy({ planId })
  }

  @Get('/user')
  async findAccountsByUserId(
    @Request() { user: { userId } }: { user: { userId: string } },
  ) {
    return await this.accountService.findAccountsByUserId(userId)
  }

  @Post()
  async create(@Body() account: Create) {
    return await this.accountService.create(account)
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() account: Update) {
    return await this.accountService.update(id, account)
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.accountService.delete(id)
  }
}
