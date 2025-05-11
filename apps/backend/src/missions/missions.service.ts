import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateMissionDto } from './dto/create-mission.dto'
import { UpdateMissionDto } from './dto/update-mission.dto'
import { Mission } from '@prisma/client'

@Injectable()
export class MissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Pick<Mission, 'id' | 'title' | 'description'>[]> {
    return [
      { id: 'test-id-1', title: 'test', description: 'test row11' },
      { id: 'test-id-1', title: 'test', description: 'test row11' },
      { id: 'test-id-1', title: 'test', description: 'test row11' },
      { id: 'test-id-1', title: 'test', description: 'test row11' },
      { id: 'test-id-1', title: 'test', description: 'test row11' },
      { id: 'test-id-1', title: 'test', description: 'test row11' },
    ]
    // return this.prisma.mission.findMany({ orderBy: { createdAt: 'desc' } })
  }

  findOne(id: string) {
    return this.prisma.mission.findUnique({ where: { id } })
  }

  update(id: string, data: UpdateMissionDto) {
    return this.prisma.mission.update({
      where: { id },
      data,
    })
  }

  remove(id: string) {
    return this.prisma.mission.delete({
      where: { id },
    })
  }
}
