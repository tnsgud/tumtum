import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Res,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Request, Response } from 'express'
import { RefreshDto, RefreshOutput } from './dto/refresh.dto'
import { LoginDto, LoginOutput } from './dto/login.dto'
import { CreateAccountDto, CreateAccountOutput } from './dto/create-account.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginOutput> {
    const { output, refreshToken } = await this.authService.login(dto)

    response.cookie('refreshToken', refreshToken, { httpOnly: true })

    return output
  }

  @Post('/create-account')
  async createAccount(
    @Body() dto: CreateAccountDto,
  ): Promise<CreateAccountOutput> {
    const output = await this.authService.createAccount(dto)

    if (!output.ok) {
      throw new BadRequestException(output.error)
    }

    return output
  }

  @Post('/refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<RefreshOutput> {
    const { refreshToken } = request.cookies

    if (!refreshToken) {
      throw new BadRequestException('refresh token is undefined')
    }

    const { output, refreshToken: newRefreshToken } =
      await this.authService.refresh(new RefreshDto(refreshToken))

    response.cookie('refreshToken', newRefreshToken, { httpOnly: true })

    return output
  }
}
