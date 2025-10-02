import { HttpException, HttpStatus } from '@nestjs/common'

export class OrderPaidError extends HttpException {
  constructor() {
    super(
      'Ocorreu um erro com webhook de pagamentos.',
      HttpStatus.INTERNAL_SERVER_ERROR,
    )
  }
}

export class OrderFailedError extends HttpException {
  constructor() {
    super('Ocorreu um erro com webhook de pagamentos.', HttpStatus.NOT_FOUND)
  }
}
