import { Module } from '@nestjs/common';
import { SignUpUserController } from './controller/signup-user.controller';
import { SIGNUP_USER_INBOUND_PORT } from './inbound-port/signup-user.inbound-port';
import { SignUpUserService } from './service/signup-user.service';

@Module({
  controllers: [SignUpUserController],
  providers: [
    { provide: SIGNUP_USER_INBOUND_PORT, useClass: SignUpUserService },
  ],
})
export class UserModule {}
