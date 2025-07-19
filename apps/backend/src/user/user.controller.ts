import { Controller, Delete, Get, Patch, Req } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/all')
  async getAllUser() {
    return this.userService.getAllUser()
  }

  @Get('/me')
  async getProfile(@Req() request: Request) {
    console.log(request.headers)
  }

  @Patch('/me')
  async updateProfile() {}

  @Delete('/me')
  async deleteProfile() {}
}
