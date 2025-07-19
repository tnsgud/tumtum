import { Injectable } from '@nestjs/common'
import { RefreshDto, RefreshOutput } from './dto/refresh.dto'
import { JwtService } from 'src/jwt/jwt.service'
import { JwtPayload } from 'jsonwebtoken'
import { PrismaService } from 'src/prisma/prisma.service'
import { LoginDto, LoginOutput } from './dto/login.dto'
import { AuthError, authErrorMessages } from '@tumtum/shared'
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async createAccount({
    email,
    password,
    username: nickname,
  }: CreateAccountDto): Promise<CreateAccountOutput> {
    const output = new CreateAccountOutput()
    try {
      const exists = await this.prismaService.user.findUnique({
        where: { email },
      })

      if (exists) {
        output.error = new UserError(UserErrorCode.EMAIL_EXISTS)
        return output
      }

      // WEAK_PASSWORD, INVALID_NICKNAME 관련 에러처리해야함
      const result = await this.prismaService.createUserWithHashedPassword({
        data: {
          email,
          nickname,
          password,
        },
      })

      output.ok = true
    } catch (error) {
      console.log(error)
    }

    return output
  }

  // dto에서 뭐가 와야 할까? email, password로 로그인 시키자
  // login을 시도한 시간도 필요할듯 for logging and token exp
  async login({
    email,
    password,
  }: LoginDto): Promise<{ output: LoginOutput; refreshToken: string }> {
    const result = {
      output: new LoginOutput(),
      refreshToken: '',
    }
    try {
      // salt가 필요할 듯 나중에 메소드로 만들어서 재사용가능하게 만들면 좋을듯
      // 아니 쓸모 없을 수도 쓰는 곳이 2곳 말고는 없는거 같기도함
      const user = await this.prismaService.user.findUnique({
        select: { id: true, password: true },
        where: { email },
      })

      if (!user) {
        result.output.error = new AuthError(
          authErrorMessages.NOT_REGISTERED_EMAIL,
        )
        return result
      }

      const ok = await bcrypt.compare(password, user.password)
      if (!ok) {
        result.output.error = new AuthError(
          authErrorMessages.NOT_MATCHED_PASSWORD,
        )
        return result
      }

      const accessToken = this.getAccessToken(user.id)
      result.refreshToken = await this.getRefreshToken(user.id)

      result.output.ok = true
      result.output.data = {
        accessToken,
      }
    } catch (error) {
      console.log(error)
    }

    return result
  }

  async refresh({
    refreshToken: oldRefreshToken,
  }: RefreshDto): Promise<{ output: RefreshOutput; refreshToken: string }> {
    const result = {
      output: new RefreshOutput(),
      refreshToken: '',
    }

    try {
      const payload = this.jwtService.verify(oldRefreshToken) as JwtPayload

      const user = await this.prismaService.user.findUnique({
        where: { id: payload.sub },
      })

      if (!user) {
        result.output.error = new AuthError(
          authErrorMessages.NOT_REGISTERED_EMAIL,
        )
        return result
      }

      if (user.jti !== payload.jti) {
        result.output.error = new AuthError(authErrorMessages.NOT_MATCHED_JTI)
        return result
      }

      const accessToken = this.getAccessToken(user.id)

      result.output.ok = true
      result.output.data = {
        accessToken,
      }
      result.refreshToken = await this.getRefreshToken(user.id)
    } catch (error) {
      console.log(error)
    }

    return result
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
