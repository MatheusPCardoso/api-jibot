import { HttpStatus } from '@nestjs/common'

import { CustomError } from '../custom-error'

export class AccountCreationError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao tentar criar uma conta.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}

export class AccountNotFoundError extends CustomError {
  constructor(error?: Error) {
    super('Conta não encontrada.', HttpStatus.NOT_FOUND, error?.message)
  }
}

export class AccountSearchError extends CustomError {
  constructor(error?: Error) {
    super(
      'Erro ao buscar conta.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}

export class MissingAccountError extends CustomError {
  constructor(error?: Error) {
    super('Conta não informada.', HttpStatus.BAD_REQUEST, error?.message)
  }
}
