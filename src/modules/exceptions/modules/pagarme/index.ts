import { HttpStatus } from '@nestjs/common'

import { CustomError } from '../custom-error'

export class CreateOrderError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao tentar criar uma ordem no pagarme.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}

export class CustomerCreationError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao tentar criar um cliente no pagarme.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}

export class RecipientCreationError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao tentar criar um recebedor no pagarme.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}

export class RecipientBalanceError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao tentar obter balanço no pagarme.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}

export class LootError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao tentar sacar do pagarme.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}

export class RecipientSerchError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao tentar buscar um recebedor no pagarme.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}
