import { Module } from '@nestjs/common'
import { MissionsService } from './missions.service'
import { MissionsController } from './missions.controller'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
  controllers: [MissionsController],
  providers: [PrismaService, MissionsService],
})
export class MissionsModule {}
