import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common'
import { UserModule } from './user/user.module'
import { JwtModule } from './jwt/jwt.module'
import { ConfigModule } from '@nestjs/config'
import { validate } from './config/validation'
import { JwtMiddleware } from './jwt/jwt.middleware'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    JwtModule.forRoot({ secretKey: process.env.SECRET_KEY ?? '' }),
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: '/users/all', method: RequestMethod.ALL })
  }
}
