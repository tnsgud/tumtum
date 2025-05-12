import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { SignupInputDto } from './dto/signup.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() data: SignupInputDto) {
    return this.authService.signup(data)
  }
}
