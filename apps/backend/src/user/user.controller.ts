import { Controller, Delete, Get, Patch, Req } from '@nestjs/common'
import { UserService } from './user.service'
import { Request } from 'express'
import { User } from '@tumtum/db'

interface CustomRequest extends Request {
  user: User
}

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/all')
  async getAllUser(@Req() request: Request) {
    return this.userService.getAllUser()
  }

  @Get('/me')
  async getProfile(@Req() request: CustomRequest) {
    const { user } = request

    return user
  }

  @Patch('/me')
  async updateProfile() {}

  @Delete('/me')
  async deleteProfile() {}

  @Get('/me/onboarding-status')
  async getOnboardingStatus(@Req() request: CustomRequest) {
    const { user } = request

    return {
      ok: true,
      data: user.is_onboarding_completed,
      error: undefined,
    }
  }
}
