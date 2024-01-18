import { HttpService } from '@nestjs/axios';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import * as jose from 'jose';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly http: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = String(request.headers.accesstoken);
    const idToken = this.extractTokenFromHeader(request);

    if (!accessToken || !idToken) {
      throw new UnauthorizedException();
    }

    try {
      const validate = await firstValueFrom(
        this.http.get('https://id.twitch.tv/oauth2/validate', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
      );

      if (!validate) {
        throw new UnauthorizedException();
      }

      const token = jose.decodeJwt(idToken);

      request['user'] = token.payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
