import { config } from 'dotenv'
import * as jwt from 'jsonwebtoken'

export interface TokenData {
  planId: number
  customerId: number
}
config()
export default class JwtToken {
  private static readonly secret = process.env.JWT_SECRET

  static generate(data: TokenData): string {
    console.log('secret => ', this.secret)
    return jwt.sign(data, this.secret)
  }

  static verify(token: string): TokenData {
    return jwt.verify(token, this.secret) as TokenData
  }
}
