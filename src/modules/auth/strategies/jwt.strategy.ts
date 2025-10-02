import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { jwtConstants } from '../constants'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    })
  }

  private static extractJWT(req: Request): string | null {
    if (req.cookies && req.cookies.accessToken) {
      return req.cookies.accessToken
    }
    if (req.headers.authorization) {
      return req.headers.authorization
    }
    return null
  }

  async validate(payload: any) {
    return {
      userId: payload.userId,
      email: payload.email,
      accountId: payload.accountId,
    }
  }
}
