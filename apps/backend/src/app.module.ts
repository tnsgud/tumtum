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
import { AuthModule } from './auth/auth.module'
import { MissionModule } from './mission/mission.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    JwtModule.forRoot({ secretKey: process.env.SECRET_KEY ?? '' }),
    AuthModule,
    UserModule,
    MissionModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path: '/*', method: RequestMethod.ALL })
  }
}
