import { HttpStatus } from '@nestjs/common'

import { CustomError } from '../custom-error'

export class PlanNotFoundError extends CustomError {
  constructor(error?: Error) {
    super('Plano não encontrado.', HttpStatus.NOT_FOUND, error?.message)
  }
}

export class PlansNotFoundError extends CustomError {
  constructor(error?: Error) {
    super('Planos não encontrados.', HttpStatus.NOT_FOUND, error?.message)
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

export class PlanCreationError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao criar plano.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}

export class PlanSearchError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao buscar plano.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}

export class PlansSearchError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao buscar planos.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}
