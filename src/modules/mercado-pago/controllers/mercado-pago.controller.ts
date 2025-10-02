import { Controller, Get, Query, Request, Res } from '@nestjs/common'
import { v4 as uuidv4 } from 'uuid'
import { MercadoPagoConfig } from 'mercadopago'
import { MercadoPagoService } from '../services/mercado-pago.service'
import { Response } from 'express'
@Controller('mercado-pago')
export class MercadoPagoController {
  constructor(private mercadoPagoService: MercadoPagoService) {}
  client = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
    options: { timeout: 5000, idempotencyKey: uuidv4() },
  })
  clientId: string = process.env.MERCADO_PAGO_APP_ID
  clientSecret: string = process.env.MERCADO_PAGO_CLIENT_SECRET

  @Get('/oauth-url')
  generateOauthUrl(
    @Request() { user: { accountId } }: { user: { accountId: string } },
  ) {
    return this.mercadoPagoService.generateOauthUrl({
      client: this.client,
      clientId: this.clientId,
      redirectUri: `${process.env.JIBOT_API_URL}/mercado-pago/oauth`,
      accountId,
    })
  }

  @Get('/oauth')
  async saveMercadoPagoCredentials(
    @Query('code') code: string,
    @Query('state') accountId: string,
    @Res() response: Response,
  ) {
    await this.mercadoPagoService.saveMercadoPagoCredentials({
      client: this.client,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      code,
      redirectUri: `${process.env.JIBOT_API_URL}/mercado-pago/oauth`,
      accountId,
    })
    return response.redirect(`${process.env.JIBOT_FRONTEND_URL}/oauth/success`)
  }
}
