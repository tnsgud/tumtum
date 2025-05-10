import { Module } from '@nestjs/common'
import { MissionsModule } from './missions/missions.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
  imports: [PrismaModule, MissionsModule],
})
export class AppModule {}
