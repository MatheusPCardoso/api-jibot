import { AllExceptionsFilter } from '@exceptions/global-filters/all-exception.filter'
import { HttpExceptionFilter } from '@exceptions/global-filters/http-exception.filter'
import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost, NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'

import { AppModule } from './app.module'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })

  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle('Jibot API')
    .setVersion('0.1')
    .addTag('Autenticação')
    .addTag('Conta')
    .addTag('Bots')
    .addTag('Canal')
    .addTag('Cliente')
    .addTag('Plano')
    .addTag('Inscrição')
    .addTag('Transação')
    .addTag('Usuário')
    .addTag('Pagarme')
    .addTag('Notificação')
    .addTag('Dashboard')
    .addTag('Telegram')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  const configService = app.get(ConfigService)
  const httpAdapterHost = app.get(HttpAdapterHost)
  app.useGlobalFilters(
    new AllExceptionsFilter(httpAdapterHost, configService),
    new HttpExceptionFilter(configService),
  )
  await app.listen(process.env.PORT || 3001)

  const url = await app.getUrl()
  console.log(`Application is running on: ${url}`)
}
bootstrap()
