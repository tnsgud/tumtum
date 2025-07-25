import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { JwtService } from 'src/jwt/jwt.service'
import { JwtPayload } from 'jsonwebtoken'
import { PrismaService } from 'src/prisma/prisma.service'
import { LoginDto } from './dto/login.dto'
import {
  AuthError,
  AuthErrorCode,
  CoreOutput,
  CreateAccountOutput,
  createFailedOutput,
  createSuccessOutput,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
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
    try {
      const exists = await this.prismaService.user.findUnique({
        where: { email },
      })

      if (exists) {
        return createFailedOutput(
          new AuthError(AuthErrorCode.EMAIL_ALREADY_EXISTS),
        )
      }
    } catch (error) {
      return createFailedOutput(error)
    }

    if (password.length < PASSWORD_MIN_LENGTH) {
      return createFailedOutput(new AuthError(AuthErrorCode.PASSWORD_IS_SHORT))
    }

    const regexp = new RegExp(PASSWORD_REGEX)
    if (!regexp.test(password)) {
      return createFailedOutput(new AuthError(AuthErrorCode.WEAK_PASSWORD))
    }

    try {
      await this.prismaService.createUserWithHashedPassword({
        data: {
          email,
          nickname,
          password,
        },
      })

      return createSuccessOutput(undefined)
    } catch (error) {
      return createFailedOutput(error)
    }
  }

  async login({
    email,
    password,
  }: LoginDto): Promise<
    CoreOutput<{ accessToken: string; refreshToken: string }, AuthError>
  > {
    try {
      const user = await this.prismaService.user.findUnique({
        select: { id: true, password: true, nickname: true },
        where: { email },
      })

      if (!user) {
        return createFailedOutput(
          new AuthError(AuthErrorCode.NOT_REGISTERED_EMAIL),
        )
      }

      const ok = await bcrypt.compare(password, user.password)
      if (!ok) {
        return createFailedOutput(
          new AuthError(AuthErrorCode.NOT_MATCHED_PASSWORD),
        )
      }

      const accessToken = this.getAccessToken(user.id, user.nickname)
      const refreshToken = await this.getRefreshToken(user.id)

      const output = createSuccessOutput({ accessToken, refreshToken })

      console.log(output)
      return output
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
  }

  async refresh(
    oldRefreshToken: string,
  ): Promise<
    CoreOutput<{ accessToken: string; refreshToken: string }, AuthError>
  > {
    try {
      const payload = this.jwtService.verify(oldRefreshToken) as JwtPayload

      const user = await this.prismaService.user.findUnique({
        where: { id: payload.sub },
      })

      if (!user) {
        return createFailedOutput(
          new AuthError(AuthErrorCode.NOT_REGISTERED_EMAIL),
        )
      }

      if (user.jti !== payload.jti) {
        return createFailedOutput(new AuthError(AuthErrorCode.NOT_MATCHED_JTI))
      }

      const accessToken = this.getAccessToken(user.id, user.nickname)
      const refreshToken = await this.getRefreshToken(user.id)

      return createSuccessOutput({ accessToken, refreshToken })
    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error)
    }
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
