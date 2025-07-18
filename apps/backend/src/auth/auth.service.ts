import { Injectable } from '@nestjs/common'
import { RefreshDto, RefreshOutput } from './dto/refresh.dto'
import { JwtService } from 'src/jwt/jwt.service'
import { JwtPayload } from 'jsonwebtoken'
import { PrismaService } from 'src/prisma/prisma.service'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async refresh({
    refreshToken: oldRefreshToken,
  }: RefreshDto): Promise<{ output: RefreshOutput; refreshToken: string }> {
    const output = new RefreshOutput()
    let refreshToken = ''

    try {
      const payload = this.jwtService.verify(oldRefreshToken) as JwtPayload

      const user = await this.prismaService.user.findUnique({
        where: { id: payload.sub },
      })

      if (!user) {
        throw new Error('user is not exists by id')
      }

      if (user.jti !== payload.jti) {
        throw new Error('jti is not equals')
      }

      const accessToken = this.getAccessToken(user.id)
      refreshToken = await this.getRefreshToken(user.id)

      output.data = {
        accessToken,
      }
    } catch (error) {
      console.log(error)
    }

    return {
      output,
      refreshToken,
    }
  }

  getAccessToken(userId: string): string {
    const payload = {
      sub: userId,
    }

    return this.jwtService.sign(payload, true)
  }

  async getRefreshToken(userId: string): Promise<string> {
    const payload = {
      sub: userId,
      jti: uuidv4(),
    }

    try {
      await this.prismaService.user.update({
        data: { jti: payload.jti },
        where: { id: userId },
      })
    } catch (error) {
      console.log(error)
    }

    return this.jwtService.sign(payload, false)
  }
}
