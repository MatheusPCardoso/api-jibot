import { HttpStatus } from '@nestjs/common'

import { CustomError } from '../../custom-error'

export class MaxAttemptsError extends CustomError {
  constructor(error?: Error) {
    super(
      'Máximo de tentativas alcançado, tente novamente mais tarde.',
      HttpStatus.TOO_MANY_REQUESTS,
      error?.message,
    )
  }
}
