import { HttpStatus } from '@nestjs/common'
import { CustomError } from '../custom-error'

export class SubscriptionCreationError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao tentar criar uma inscrição.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}

export class SubscriptionUpdateError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao tentar atualizar a inscrição.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}

export class SubscriptionIsValidError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao tentar validar a inscrição.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}

export class GetExpiredSubscriptionsError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao tentar obter as inscrições expiradas.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}

export class SetSubscriptionInactiveError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao tentar desativar a inscrição.',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}
