import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { UserService } from './user.service'
import { CreateAccountDto, CreateAccountOutput } from './dto/create-account.dto'
import { AuthGuard } from 'src/auth/auth.guard'
import { FindUserDto } from './dto/find-user.dto'
import { LoginDto, LoginOutput } from './dto/login.dto'

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/create-account')
  async createAccount(
    @Body() dto: CreateAccountDto,
  ): Promise<CreateAccountOutput> {
    const output = await this.userService.createAccount(dto)

    if (!output.ok) {
      throw new BadRequestException(output.error)
    }

    return output
  }

  @Post('/login')
  async login(@Body() dto: LoginDto): Promise<LoginOutput> {
    return this.userService.login(dto)
  }

  @Get('/all')
  async getAllUser() {
    return this.userService.getAllUser()
  }

  // User 관련 정보를 찾는건 굳이 데이터로 받을 필요 없이 유저 아이디만 내가 얻으면 될듯
  // Jwt module + middleware까지 만들었는데 이제 적용하면 될 듯

  @Get('/id')
  async findUser(@Query() params: FindUserDto) {
    return this.userService.findUserById({ id: params.id })
  }

  @Get('/me')
  async getProfile() {}

  @Patch('/me')
  async updateProfile() {}

  @Delete('/me')
  async deleteProfile() {}
}
