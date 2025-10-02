import { HttpStatus } from '@nestjs/common'
import { CustomError } from '../custom-error'

export class UserSearchError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao buscar o usuário.',
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

export class UserCreationError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao criar o usuário.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}
