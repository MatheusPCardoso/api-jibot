import { HttpStatus } from '@nestjs/common'
import { CustomError } from '../custom-error'

export class TransactionCreationError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao tentar criar uma transação.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}

export class ParamsMissingError extends CustomError {
  constructor() {
    super(
      'É necessário pelo menos um parametro para completar a busca',
      HttpStatus.BAD_REQUEST,
    )
  }
}

export class TransactionUpdateError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao tentar atualizar a transação.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}

export class TransactionSearchError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao tentar buscar as transações.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}
