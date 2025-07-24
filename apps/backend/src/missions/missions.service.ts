import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { createOutput, FindAllMissionsOutuput } from '@tumtum/shared'

@Injectable()
export class MissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string): Promise<FindAllMissionsOutuput> {
    const output = createOutput<FindAllMissionsOutuput>()

    output.ok = true
    output.data = []

    return output
    // return this.prisma.mission.findMany({ orderBy: { createdAt: 'desc' } })
  }

  findOne(id: string) {
    return this.prisma.mission.findUnique({ where: { id } })
  }
}
