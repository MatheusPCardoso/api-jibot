import { Injectable } from '@nestjs/common'
import {
  CreateCredentialsError,
  CreateMercadoPagoCustomerError,
  CreateOrderError,
  GenerateAuthorizationUrlError,
  GetSellerTokenMercadoPagoError,
} from '@src/modules/exceptions/mercado-pago'
import MercadoPagoConfig, { Customer, OAuth, Preference } from 'mercadopago'
import {
  CreateMercadoPagoOrder,
  GenerateOauthUrl,
  SaveMercadoPagoCredentials,
} from '../dtos'
import { PrismaService } from '@src/modules/common/services/prisma.service'
import { AccountNotFoundError } from '@src/modules/exceptions/modules/common/account.exceptions'

@Injectable()
export class MercadoPagoService {
  constructor(private readonly prismaService: PrismaService) {}

  generateOauthUrl({
    client,
    clientId,
    redirectUri,
    accountId,
  }: GenerateOauthUrl) {
    try {
      const oauth = new OAuth(client)
      const url = oauth.getAuthorizationURL({
        options: {
          client_id: clientId,
          redirect_uri: redirectUri,
          state: accountId,
        },
      })
      return {
        url,
      }
    } catch (err) {
      throw new GenerateAuthorizationUrlError(err)
    }
  }

  async saveMercadoPagoCredentials({
    client,
    clientId,
    clientSecret,
    code,
    redirectUri,
    accountId,
  }: SaveMercadoPagoCredentials) {
    try {
      const credentials = await new OAuth(client).create({
        body: {
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: redirectUri,
        },
      })

      const account = await this.prismaService.account.findUnique({
        where: { id: accountId },
      })

      if (!account) {
        throw new AccountNotFoundError()
      }

      await this.prismaService.account.update({
        where: {
          id: accountId,
        },
        data: {
          config: {
            ...account.config,
            mercadoPago: {
              accessToken: credentials?.access_token,
              publicKey: credentials?.public_key,
              refreshToken: credentials?.refresh_token,
              liveMode: credentials?.live_mode,
              userId: credentials?.user_id,
              tokenType: credentials?.token_type,
              expiresIn: credentials?.expires_in,
              scope: credentials?.scope,
            },
          },
        },
      })
    } catch (err) {
      throw new CreateCredentialsError(err)
    }
  }

  async createMercadoPagoOrder({
    accessToken,
    productId,
    productPrice,
    productQuantity = 1,
    productDescription,
    productTitle,
    transactionId,
    payerName,
  }: CreateMercadoPagoOrder) {
    try {
      const client = new MercadoPagoConfig({
        accessToken,
      })

      const { init_point } = await new Preference(client).create({
        body: {
          items: [
            {
              id: productId,
              unit_price: productPrice,
              quantity: productQuantity,
              title: productTitle,
              description: productDescription,
            },
          ],
          marketplace_fee: productPrice * 0.15,
          external_reference: transactionId,
          metadata: { transactionId },
          payer: {
            name: payerName,
          },
        },
      })

      return { url: init_point }
    } catch (err) {
      throw new CreateOrderError(err)
    }
  }

  async getMercadoPagoSellerToken(accountId: string) {
    try {
      const {
        config: {
          mercadoPago: { accessToken },
        },
      } = await this.prismaService.account.findUnique({
        where: { id: accountId },
        select: {
          config: {
            select: {
              mercadoPago: {
                select: {
                  accessToken: true,
                },
              },
            },
          },
        },
      })
      return accessToken
    } catch (err) {
      throw new GetSellerTokenMercadoPagoError(err)
    }
  }

  async createMercadoPagoCustomer({
    name,
    email,
  }: {
    name: string
    email: string
  }) {
    try {
      const client = new MercadoPagoConfig({
        accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
      })
      const customerBuilder = new Customer(client)

      const customer = await customerBuilder.create({
        body: {
          first_name: name,
          email,
        },
      })

      return customer
    } catch (err) {
      throw new CreateMercadoPagoCustomerError(err)
    }
  }
}
