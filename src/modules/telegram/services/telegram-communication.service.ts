import { Injectable } from '@nestjs/common'
import axios, { Axios } from 'axios'
import { RedisService } from '@src/modules/redis/services/redis.service'
import { SendMessageError } from '@src/modules/exceptions/modules/telegram'
import { CreateInviteLinkDto } from '../dtos/create-invite-link.dto'
import { KickUserDto } from '../dtos/kick-user.dto'

@Injectable()
export class TelegramCommunicationService {
  private axios: Axios
  constructor(private readonly redisService: RedisService) {
    this.axios = axios.create({
      baseURL: process.env.TELEGRAM_API_URL,
    })
  }

  async kickUser(payload: CreateInviteLinkDto) {
    try {
      return await this.axios.post('/telegram/kick', payload)
    } catch (error) {
      await this.redisService.set(
        `customer:${payload.userId}:erros:${new Date().getTime()}`,
        JSON.stringify({
          error: JSON.stringify(error),
          errorMessage: JSON.stringify(error.message),
          payload,
        }),
      )
      throw new SendMessageError(error)
    }
  }

  async sendInvite(payload: KickUserDto) {
    try {
      return await this.axios.post('/telegram/invite/send', payload)
    } catch (error) {
      await this.redisService.set(
        `customer:${payload.userId}:erros:${new Date().getTime()}`,
        JSON.stringify({
          error: JSON.stringify(error),
          errorMessage: JSON.stringify(error.message),
          payload,
        }),
      )
      throw new SendMessageError(error)
    }
  }
}
