import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from './jwt.service'
import { Request, Response, NextFunction } from 'express'
import { UserService } from 'src/user/user.service'
import { JwtPayload } from 'jsonwebtoken'
import { FindUserDto } from 'src/user/dto/find-user.dto'

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if ('authorization' in req.headers) {
      try {
        const token = req.headers.authorization as string
        const decoded = this.jwtService.verify(
          token.split(' ')[1],
        ) as JwtPayload

        const { ok, data, error } = await this.userService.findUserById({
          id: decoded.sub ?? '',
        })

        if (!ok) {
          throw new UnauthorizedException()
        }

        // biome-ignore lint/complexity/useLiteralKeys: <explanation>
        req['user'] = data
      } catch (error) {
        console.log(error)
      }
    }

    next()
  }
}
