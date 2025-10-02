import { HttpStatus } from '@nestjs/common'

import { CustomError } from '../custom-error'

export class CustomerNotFoundError extends CustomError {
  constructor() {
    super('Não foi encontrado o canal.', HttpStatus.NOT_FOUND)
  }
}

export class CustomerCreationError extends CustomError {
  constructor(errors: Error) {
    super(
      'Erro ao criar o cliente.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      errors.message,
    )
  }
}

export class CustomerSearchError extends CustomError {
  constructor(errors: Error) {
    super(
      'Erro ao buscar o cliente.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      errors.message,
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

export class CustomersSearchError extends CustomError {
  constructor(errors: Error) {
    super(
      'Erro ao buscar os clientes.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      errors.message,
    )
  }
}

export class CustomerUpdateError extends CustomError {
  constructor(errors: Error) {
    super(
      'Erro ao atualizar ou inserir o cliente.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      errors.message,
    )
  }
}

export class CustomerSubscriptionError extends CustomError {
  constructor(errors: Error) {
    super(
      'Erro ao criar uma subscription para o cliente.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      errors.message,
    )
  }
}
