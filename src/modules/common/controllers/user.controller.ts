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

import { UserService } from '../services/user.service'
import { Create, Update } from '../dto/user.dto'

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  async find(@Param('id') id: string) {
    return await this.userService.find(id)
  }

  @Get('/all')
  async findBy(@Query('email') email: string) {
    return await this.userService.findBy({ email })
  }

  @Post()
  async create(@Body() user: Create) {
    return await this.userService.create(user)
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() user: Update) {
    return await this.userService.update(id, user)
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id)
  }
}
