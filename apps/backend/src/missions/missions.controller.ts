import { Controller, Get, Param } from '@nestjs/common'
import { MissionsService } from './missions.service'

@Controller('missions')
export class MissionsController {
  constructor(private readonly missionService: MissionsService) {}

  @Get()
  findAll() {
    return this.missionService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.missionService.findOne(id)
  }
}
