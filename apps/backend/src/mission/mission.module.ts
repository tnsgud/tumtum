import { Module } from '@nestjs/common'
import { MissionService } from './mission.service'
import { MissionController } from './mission.controller'

const helllo = 'this is test'

@Module({
  controllers: [MissionController],
  providers: [MissionService],
})
export class MissionModule {}
