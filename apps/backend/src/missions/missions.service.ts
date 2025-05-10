import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateMissionDto } from './dto/create-mission.dto'
import { UpdateMissionDto } from './dto/update-mission.dto'

@Injectable()
export class MissionsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.mission.findMany({ orderBy: { createdAt: 'desc' } })
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
