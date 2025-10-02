import { Module } from '@nestjs/common'
import { HttpExceptionFilter } from './global-filters/http-exception.filter'

@Module({
  providers: [HttpExceptionFilter],
  exports: [HttpExceptionFilter],
})
export class ExceptionsModule {}
