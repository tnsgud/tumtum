import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { MissionModule } from 'src/mission/mission.module';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
