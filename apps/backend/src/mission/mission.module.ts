import { Module } from '@nestjs/common'
import { MissionController } from './mission.controller'
import { MissionService } from './mission.service'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  controllers: [MissionController],
  providers: [PrismaService, MissionService],
})
export class MissionModule {}
