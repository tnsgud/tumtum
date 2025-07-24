import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Request, Response } from 'express'
import { LoginDto } from './dto/login.dto'
import { CreateAccountDto } from './dto/create-account.dto'
import {
  AuthError,
  AuthErrorCode,
  CreateAccountOutput,
  LoginOutput,
  RefreshOutput,
} from '@tumtum/shared'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Post('/login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginOutput> {
    const { output, refreshToken } = await this.authService.login(dto)

    if (!output.ok) {
      throw new BadRequestException(output.error)
    }

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 3600 * 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
      secure: false,
    })

    return output
  }

  @Get('/refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<RefreshOutput> {
    const { refreshToken } = request.cookies

    if (!refreshToken) {
      throw new BadRequestException(
        new AuthError(AuthErrorCode.REFRESH_TOKEN_MISSING),
      )
    }

    const { output, refreshToken: newRefreshToken } =
      await this.authService.refresh(refreshToken)

    response.cookie('refreshToken', newRefreshToken, { httpOnly: true })

    return output
  }
}
