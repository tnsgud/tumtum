import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient, Prisma } from '@tumtum/db'
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
      // salt가 필요할 듯 나중에 메소드로 만들어서 재사용가능하게 만들면 좋을듯
      // 아니 쓸모 없을 수도 쓰는 곳이 2곳 말고는 없는거 같기도함
      const hashedPassword = await bcrypt.hash(data.password, 10)
      data.password = hashedPassword
    }

    return await this.user.create({ data })
  }

  async updateWithHashedPassword(args: Prisma.UserUpdateArgs) {
    const { data } = args
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password.toString(), 10)
      data.password = hashedPassword
    }

    return await this.user.update({ ...args, data })
  }
}
