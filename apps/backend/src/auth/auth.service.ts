import { Injectable } from '@nestjs/common'
import { JwtService } from 'src/jwt/jwt.service'
import { JwtPayload } from 'jsonwebtoken'
import { PrismaService } from 'src/prisma/prisma.service'
import { LoginDto } from './dto/login.dto'
import {
  AuthError,
  AuthErrorCode,
  authErrorMessages,
  CreateAccountOutput,
  createOutput,
  LoginOutput,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  RefreshOutput,
} from '@tumtum/shared'
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { CreateAccountDto } from './dto/create-account.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async createAccount({
    email,
    password,
    nickname,
  }: CreateAccountDto): Promise<CreateAccountOutput> {
    const output = createOutput<CreateAccountOutput>()

    try {
      const exists = await this.prismaService.user.findUnique({
        where: { email },
      })

      if (exists) {
        output.error = new AuthError(AuthErrorCode.EMAIL_ALREADY_EXISTS)
        return output
      }

      if (password.length < PASSWORD_MIN_LENGTH) {
        output.error = new AuthError(AuthErrorCode.PASSWORD_IS_SHORT)
        return output
      }

      const regexp = new RegExp(PASSWORD_REGEX)
      if (!regexp.test(password)) {
        output.error = new AuthError(AuthErrorCode.WEAK_PASSWORD)
        return output
      }

      await this.prismaService.createUserWithHashedPassword({
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

  async login({
    email,
    password,
  }: LoginDto): Promise<{ output: LoginOutput; refreshToken: string }> {
    const result = {
      output: createOutput<LoginOutput>(),
      refreshToken: '',
    }
    try {
      const user = await this.prismaService.user.findUnique({
        select: { id: true, password: true, nickname: true },
        where: { email },
      })

      if (!user) {
        result.output.error = new AuthError(AuthErrorCode.NOT_REGISTERED_EMAIL)
        return result
      }

      const ok = await bcrypt.compare(password, user.password)
      if (!ok) {
        result.output.error = new AuthError(AuthErrorCode.NOT_MATCHED_PASSWORD)
        return result
      }

      const accessToken = this.getAccessToken(user.id, user.nickname)
      result.refreshToken = await this.getRefreshToken(user.id)

      result.output.ok = true
      result.output.data = accessToken
    } catch (error) {
      console.log(error)
    }

    return result
  }

  async refresh(
    oldRefreshToken: string,
  ): Promise<{ output: RefreshOutput; refreshToken: string }> {
    const result = {
      output: createOutput<RefreshOutput>(),
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

      const accessToken = this.getAccessToken(user.id, user.nickname)

      result.output.ok = true
      result.output.data = accessToken

      result.refreshToken = await this.getRefreshToken(user.id)
    } catch (error) {
      console.log(error)
    }

    return result
  }

  getAccessToken(userId: string, nickname: string): string {
    const payload = {
      sub: userId,
      nickname,
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
