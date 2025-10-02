import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import {
  GenericLoginError,
  LoginError,
} from '@src/modules/exceptions/modules/auth'

import { compareHash } from '../utils/hash-functions'
import { User } from '@prisma/client'
import { TokenType } from '../types'
import { Login } from '../dtos'
import { UserService } from '@src/modules/common/services/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login({
    email,
    password,
  }: Login): Promise<{ accessToken: string; name: string }> {
    try {
      const user = await this.validateUser(email, password)
      const payload: TokenType = {
        userId: user.id,
        email: user.email,
        authenticated: true,
        selectedAccount: false,
      }
      return {
        accessToken: this.jwtService.sign(payload),
        name: `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`,
      }
    } catch (error) {
      throw new GenericLoginError(error)
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findBy({ email })
    if (!user.length) throw new LoginError()

    const isPasswordValid = await compareHash(password, user[0].passwordHash)

    if (!isPasswordValid) throw new LoginError()

    return user[0]
  }

  async addInfoToToken(token: string, newInfo: any): Promise<string> {
    const decoded = this.jwtService.decode(token)
    delete decoded.iat
    delete decoded.exp
    const { ...rest } = decoded
    const updatedPayload = { ...rest, ...newInfo }
    return this.jwtService.sign(updatedPayload)
  }
}
