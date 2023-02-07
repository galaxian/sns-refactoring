import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignUpUserController } from './controller/signup-user.controller';
import { TypeOrmUser } from './entity/typeorm-user.entity';
import { SIGNUP_USER_INBOUND_PORT } from './inbound-port/signup-user.inbound-port';
import { SignUpUserRepository } from './outbound-adapter/signup-user.repository';
import { SIGNUP_USER_OUTBOUND_PORT } from './outbound-port/signup-user.outbound-port';
import { SignUpUserService } from './service/signup-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmUser])],
  controllers: [SignUpUserController],
  providers: [
    { provide: SIGNUP_USER_INBOUND_PORT, useClass: SignUpUserService },
    { provide: SIGNUP_USER_OUTBOUND_PORT, useClass: SignUpUserRepository },
  ],
})
export class UserModule {}
