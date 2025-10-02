import { HttpStatus } from '@nestjs/common'
import { CustomError } from '../modules/custom-error'

export class CreateCredentialsError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao criar as credenciais',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}

export class CredentialsError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao buscar as credenciais',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}

export class GenerateAuthorizationUrlError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao buscar as credenciais',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}

export class CreateOrderError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao criar a order',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}

export class GetSellerTokenMercadoPagoError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao buscar o token do vendedor no mercado pago',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}

export class CreateMercadoPagoCustomerError extends CustomError {
  constructor(error?: Error) {
    super(
      'Ocorreu um erro ao criar customer do mercado pago',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error?.message,
    )
  }
}
