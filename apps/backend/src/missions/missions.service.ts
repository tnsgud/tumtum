import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UpdateMissionDto } from './dto/update-mission.dto'
import { Mission } from '@prisma/client'
import { FindMissionOutput } from './dto/find-mission.dto'

@Injectable()
export class MissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string): Promise<FindMissionOutput> {
    const output = new FindMissionOutput()

    output.ok = true
    output.data = [
      {
        id: 'test-id-1',
        title: 'test',
        description: 'test row11',
        category: '',
        dueDate: new Date(),
        isCompleted: true,
      },
      {
        id: 'test-id-1',
        title: 'test',
        description: 'test row11',
        category: '',
        dueDate: new Date(),
        isCompleted: false,
      },
      {
        id: 'test-id-1',
        title: 'test',
        description: 'test row11',
        category: '',
        dueDate: new Date(),
        isCompleted: true,
      },
      {
        id: 'test-id-1',
        title: 'test',
        description: 'test row11',
        category: '',
        dueDate: new Date(),
        isCompleted: false,
      },
      {
        id: 'test-id-1',
        title: 'test',
        description: 'test row11',
        category: '',
        dueDate: new Date(),
        isCompleted: true,
      },
      {
        id: 'test-id-1',
        title: 'test',
        description: 'test row11',
        category: '',
        dueDate: new Date(),
        isCompleted: false,
      },
      {
        id: 'test-id-1',
        title: 'test',
        description: 'test row11',
        category: '',
        dueDate: new Date(),
        isCompleted: false,
      },
      {
        id: 'test-id-1',
        title: 'test',
        description: 'test row11',
        category: '',
        dueDate: new Date(),
        isCompleted: false,
      },
    ]

    return output
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
