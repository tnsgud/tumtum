import { Body, Controller, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateAccountDto } from './dto/create-account.dto'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create-account')
  async createAccount(@Body() data: CreateAccountDto) {
    return this.userService.createAccount(data)
  }
}
