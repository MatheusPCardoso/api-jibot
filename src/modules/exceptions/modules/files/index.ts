import { HttpException, HttpStatus } from '@nestjs/common'

export class FileUploadError extends HttpException {
  constructor() {
    super('Erro no upload de arquivo', HttpStatus.INTERNAL_SERVER_ERROR)
  }
}

export class WrongFolderError extends HttpException {
  constructor() {
    super('Pasta inválida', HttpStatus.INTERNAL_SERVER_ERROR)
  }
}
