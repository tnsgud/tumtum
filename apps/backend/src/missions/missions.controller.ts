import { Controller, Get, Param, Req } from '@nestjs/common'
import { MissionsService } from './missions.service'
import { Request } from 'express'
import { User } from '@prisma/client'
import { FindMissionOutput } from './dto/find-mission.dto'

interface CustomRequest extends Request {
  user: User
}

@Controller('missions')
export class MissionsController {
  constructor(private readonly missionService: MissionsService) {}

  @Get()
  findAll(@Req() request: CustomRequest): Promise<FindMissionOutput> {
    const { user } = request

    return this.missionService.findAll(user.id)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.missionService.findOne(id)
  }
}
