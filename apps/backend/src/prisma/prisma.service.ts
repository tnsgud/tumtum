import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { extendedPrisma } from './extendedClient'

@Injectable()
export class PrismaService
  extends (extendedPrisma.constructor as { new (): typeof extendedPrisma })
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect()
  }

  get client() {
    return extendedPrisma
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
