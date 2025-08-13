import { Controller, Delete, Get, Patch, Put, Req } from '@nestjs/common'
import { UserService } from './user.service'
import { Request } from 'express'
import { CustomRequest } from 'src/request'

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

  @Get('/completed-onboarding')
  async changeToOnboardingComplte(@Req() request: CustomRequest) {
    const { user } = request

    console.log(user)

    return this.userService.changeToOnboardingComplete(user.id)
  }
}
