import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateAccountDto } from './dto/create-account.dto'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/create-account')
  async createAccount(@Body() data: CreateAccountDto) {
    return this.userService.createAccount(data)
  }

  @Get('/:id')
  async findUser(@Param() params: { id: string }) {
    return this.userService.findUserById(params.id)
  }

  @Get('/me')
  async getProfile() {}

  @Patch('/me')
  async updateProfile() {}

  @Delete('/me')
  async deleteProfile() {}
}
