import { Module } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { AuthService } from 'src/auth/auth.service'

@Module({
  controllers: [UserController],
  providers: [PrismaService, AuthService, UserService],
  exports: [UserService],
})
export class UserModule {}
