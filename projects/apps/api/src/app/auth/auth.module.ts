import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user/user.module';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { OpenIDConnectStrategy } from './open-id-connect.strategy';

@Module({
  imports: [PassportModule, UserModule],
  providers: [AuthGuard, AuthService, OpenIDConnectStrategy],
})
export class AuthModule {}
