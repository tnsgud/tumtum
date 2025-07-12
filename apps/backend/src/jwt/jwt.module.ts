import { DynamicModule, Global, Module } from '@nestjs/common'
import { JwtModuleOptions } from './jwt.interfaces'
import { JwtService } from './jwt.service'
import { CONFIG_OPTIONS } from './jwt.constants'

@Module({
  providers: [JwtService],
})
@Global()
// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      exports: [JwtService],
      providers: [{ provide: CONFIG_OPTIONS, useValue: options }, JwtService],
    }
  }
}
