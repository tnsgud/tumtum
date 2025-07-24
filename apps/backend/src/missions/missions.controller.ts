import { Controller, Get, Param, Req } from '@nestjs/common'
import { MissionsService } from './missions.service'
import { Request } from 'express'
import { User } from '@tumtum/db'
import { FindAllMissionsOutuput } from '@tumtum/shared'

interface CustomRequest extends Request {
  user: User
}

@Controller('missions')
export class MissionsController {
  constructor(private readonly missionService: MissionsService) {}

  @Get()
  findAll(@Req() request: CustomRequest): Promise<FindAllMissionsOutuput> {
    const { user } = request

    return this.missionService.findAll(user.id)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.missionService.findOne(id)
  }
}
