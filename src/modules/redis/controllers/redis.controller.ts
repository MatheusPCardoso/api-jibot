import {
  BadGatewayException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common'
import {
  CreateHashLogDto,
  CreateLogDto,
  GetHashLogDto,
  GetLogDto,
} from '@redis/dtos'
import { ApiExcludeController } from '@nestjs/swagger'
import { RedisService } from '@redis/services/redis.service'

@ApiExcludeController()
@Controller('redis')
export class RedisController {
  constructor(private redisService: RedisService) {}

  @Post('/hset')
  async setHashLog(
    @Body() { accountId, complement, key, value }: CreateHashLogDto,
  ) {
    try {
      await this.redisService.hset(accountId, complement, key, value)
      return 'ok'
    } catch (error) {
      throw new BadGatewayException(error)
    }
  }

  @Get('/hget')
  async getHashLog(@Body() { accountId, complement, key }: GetHashLogDto) {
    try {
      return await this.redisService.hget(accountId, complement, key)
    } catch (error) {
      throw new BadGatewayException(error)
    }
  }

  @Post('/set')
  async setLog(@Body() { key, value }: CreateLogDto) {
    try {
      await this.redisService.set(key, value)
      return 'ok'
    } catch (error) {
      throw new BadGatewayException(error)
    }
  }

  @Get('/get')
  async getLog(@Body() { key }: GetLogDto) {
    try {
      return await this.redisService.get(key)
    } catch (error) {
      throw new BadGatewayException(error)
    }
  }
}
