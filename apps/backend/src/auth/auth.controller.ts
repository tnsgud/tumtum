import { BadRequestException, Controller, Post, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Request, Response } from 'express'
import { RefreshDto, RefreshOutput } from './dto/refresh.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/refresh')
  async refresh(
    @Req() request: Request,
    @Res() response: Response,
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
