import { Module } from '@nestjs/common'
import { MissionModule } from './mission/mission.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [PrismaModule, MissionModule],
})
export class AppModule {}
