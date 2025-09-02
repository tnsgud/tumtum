import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: [
      'http://macbookpro.tail2e04c4.ts.net:3000',
      'http://bagsunhyeong-ui-macbookpro.netbird.cloud:3000',
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT.PATCH,POST,DELETE,OPTIONS',
    allowedHeaders:
      'Content-Type,Accept,Authorization,Access-Control-Allow-Origin',
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  app.use(cookieParser())

  await app.listen(process.env.PORT ?? 8080)
}

bootstrap()
