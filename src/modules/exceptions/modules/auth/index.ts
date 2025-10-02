import { HttpStatus } from '@nestjs/common'

import { CustomError } from '../custom-error'

export class LoginError extends CustomError {
  constructor(error?: Error) {
    super(
      'E-mail ou senha incorretos.',
      HttpStatus.UNAUTHORIZED,
      error?.message,
    )
  }
}

export class GenericLoginError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ops... aconteceu algo não previsto.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}
