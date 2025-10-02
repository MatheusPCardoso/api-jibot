import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from '@src/constants'
import { compareHash } from '../utils/hash-functions'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }
    const request = context.switchToHttp().getRequest()
    const apiKey = request.headers['api-key']

    if (apiKey) {
      const sameApiKey = await compareHash(process.env.JIBOT_API_KEY, apiKey)

      if (!sameApiKey) {
        throw new UnauthorizedException('Invalid API Key')
      }

      return true
    }

    const {
      cookies: { accessToken },
    } = request
    const token = accessToken || request.headers['authorization']
    const decodedToken = this.jwtService.decode(token)

    if (
      !decodedToken?.authenticated ||
      (decodedToken?.selectedAccount && !decodedToken?.accountId)
    ) {
      throw new UnauthorizedException('Token is missing')
    }

    return super.canActivate(context)
  }
}
