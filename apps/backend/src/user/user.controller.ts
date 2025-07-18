import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common'
import { Response } from 'express'
import { UserService } from './user.service'
import { CreateAccountDto, CreateAccountOutput } from './dto/create-account.dto'
import { FindUserDto } from './dto/find-user.dto'
import { LoginDto, LoginOutput } from './dto/login.dto'

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
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginOutput> {
    const { output, refreshToken } = await this.userService.login(dto)

    response.cookie('refreshToken', refreshToken, { httpOnly: true })

    return output
  }

  @Get('/all')
  async getAllUser() {
    return this.userService.getAllUser()
  }

  // @Get('/id')
  // async findUser(@Query() params: FindUserDto) {
  //   return this.userService.findUserById({ id: params.id })
  // }

  @Get('/me')
  async getProfile(@Req() request: Request) {
    console.log(request.headers)
  }

  @Patch('/me')
  async updateProfile() {}

  @Delete('/me')
  async deleteProfile() {}
}
