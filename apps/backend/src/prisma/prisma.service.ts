import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient, Prisma } from '@prisma/client'
import * as bcrypt from 'bcrypt'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }

  async createUserWithHashedPassword(args: { data: Prisma.UserCreateInput }) {
    const { data } = args

    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10)
      data.password = hashedPassword
    }

    return await this.user.create({ data })
  }
}
