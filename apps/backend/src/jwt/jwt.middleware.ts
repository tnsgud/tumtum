import { Injectable, NestMiddleware } from '@nestjs/common'
import { JwtService } from './jwt.service'
import { Request, Response, NextFunction } from 'express'
import { UserService } from 'src/user/user.service'

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      try {
        const token = req.headers['x-jwt'] as string
        const decoded = this.jwtService.verify(token.toString())

        // biome-ignore lint/suspicious/noPrototypeBuiltins: <explanation>
        if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
          const user = await this.userService.findUserById(decoded.id)

          // biome-ignore lint/complexity/useLiteralKeys: <explanation>
          req['user'] = user
        }
      } catch (error) {
        console.log(error)
      }
    }

    next()
  }
}
