import { Body, Controller, Post, Req, Res } from '@nestjs/common'
import { Public } from '@src/constants'
import { Request, Response } from 'express'

import { AuthService } from '../services/auth.service'
import { Login } from '../dtos'
import { domainGenerator } from '../utils/domain-generator'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  async signIn(
    @Body() { email, password }: Login,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, name } = await this.authService.login({
      email,
      password,
    })
    res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: !process.env.DEV,
        sameSite: 'lax',
        expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        domain: domainGenerator(),
      })
      .send({ name })
  }

  @Post('/select-account')
  async selectAccount(
    @Body() { accountId }: { accountId: number },
    @Req() { cookies: { accessToken } }: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const newToken = await this.authService.addInfoToToken(accessToken, {
      accountId,
    })

    res.cookie('accessToken', newToken, {
      httpOnly: true,
      secure: !process.env.DEV,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      domain: domainGenerator(),
    })

    res.status(200).send({ message: 'Conta selecionada com sucesso' })
  }
}
