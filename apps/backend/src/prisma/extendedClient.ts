import { PrismaClient, Prisma } from '@prisma/client'
import * as bcrypy from 'bcrypt'

const userExtension = Prisma.defineExtension({
  name: 'user-password-hash',
  model: {
    user: {
      async createWithHashedPassword(
        args: Prisma.UserCreateArgs,
      ): Promise<Prisma.UserGetPayload<typeof args>> {
        const { data } = args
        if (data.password) {
          const hashedPassword = await bcrypy.hash(data.password, 10)
          data.password = hashedPassword
        }

        return await this.create({ ...args, data })
      },

      async updateWithHashedPassword(args: Prisma.UserUpdateArgs) {
        const { data } = args
        if (data.password) {
          const hashedPassword = await bcrypy.hash(data.password.toString(), 10)
          data.password = hashedPassword
        }

        return await this.update({ ...args, data })
      },
    },
  },
})

export const extendedPrisma = new PrismaClient().$extends(userExtension)
