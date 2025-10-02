import MercadoPagoConfig from 'mercadopago'

export interface MercadoPagoSplitCredentialsDto {
  access_token: string
  public_key: string
  refresh_token: string
  live_mode: boolean
  user_id: number
  token_type: string
  expires_in: number
  scope: string
}

export interface OAuthResponse {
  access_token?: string
  public_key?: string
  refresh_token?: string
  live_mode?: boolean
  user_id?: number
  token_type?: string
  expires_in?: number
  scope?: string
}

export interface GenerateOauthUrl {
  client: MercadoPagoConfig
  clientId: string
  redirectUri: string
  accountId: string
}

export interface SaveMercadoPagoCredentials {
  client: MercadoPagoConfig
  clientId: string
  clientSecret: string
  code: string
  redirectUri: string
  accountId: string
}

export interface CreateMercadoPagoOrder {
  accessToken: string
  productId: string
  productQuantity?: number
  productPrice: number
  productTitle: string
  transactionId: string
  productDescription: string
  payerName: string
}
