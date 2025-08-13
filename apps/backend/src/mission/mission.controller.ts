import { Controller, Get, Req } from '@nestjs/common'
import { MissionService } from './mission.service'
import { CustomRequest } from 'src/request'

@Controller('missions')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Get('/')
  async getAllMissions(@Req() request: CustomRequest) {
    const { user } = request
    return this.missionService.getAllMissions(user.id)
  }
}
