import { Global, Module } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { MissionsModule } from 'src/missions/missions.module'

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
