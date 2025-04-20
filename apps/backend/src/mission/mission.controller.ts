import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common'
import { MissionService } from './mission.service'
import type { CreateMissionDto } from './dto/create-mission.dto'
import type { UpdateMissionDto } from './dto/update-mission.dto'

@Controller('missions')
export class MissionController {
  constructor(private readonly missionService: MissionService) {}

  @Get()
  findAll() {
    return this.missionService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.missionService.findOne(id)
  }
}
