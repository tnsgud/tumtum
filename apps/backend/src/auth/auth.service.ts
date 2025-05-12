import { Injectable } from '@nestjs/common'
import { SignupInputDto, SignupOutput } from './dto/signup.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup({
    email,
    password,
    username: nickname,
  }: SignupInputDto): Promise<SignupOutput> {
    const output: SignupOutput = {
      ok: false,
    }
    try {
      const { client } = this.prisma
      const exists = await client.user.findUnique({ where: { email } })

      if (exists) {
        //TODO: error msg or error code를 공용으로 만들어서 프론트쪽에서 무슨 에러인지 바로 확인 가능하도록 만들기

        output.error = 'There is a user with that email already'
        return output
      }

      const result = await client.user.createWithHashedPassword({
        data: { email, password, nickname },
      })

      output.ok = true
    } catch (error) {
      output.error = error
    }

    return output
  }
}
