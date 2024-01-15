import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { OpenIDConnectStrategy } from './open-id-connect.strategy';

@Module({
  imports: [PassportModule, UserModule],
  providers: [AuthService, OpenIDConnectStrategy],
})
export class AuthModule {}
