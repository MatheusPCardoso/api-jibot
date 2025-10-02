import { HttpStatus } from '@nestjs/common'

import { CustomError } from '../custom-error'

export class SendMessageError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao tentar enviar uma mensagem.',
      HttpStatus.NOT_FOUND,
      error?.message,
    )
  }
}
