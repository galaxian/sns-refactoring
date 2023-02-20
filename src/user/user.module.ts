import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignUpUserController } from './controller/signup-user.controller';
import { TypeOrmUser } from './entity/typeorm-user.entity';
import { SIGNUP_USER_INBOUND_PORT } from './inbound-port/signup-user.inbound-port';
import { BcryptAdapter } from './outbound-adapter/bcrypt.adapter';
import { SignUpUserRepository } from './outbound-adapter/signup-user.repository';
import { COMPARE_PASSWORD_OUTBOUND_PORT } from './outbound-port/compare-password.outbound-port';
import { GET_USER_BY_EMAIL_OUTBOUND_PORT } from './outbound-port/get-user-by-email.outbound-port';
import { GET_USER_BY_USERNAME_OUTBOUND_PORT } from './outbound-port/get-user-by-username.outbound-port';
import { HASH_PASSWORD_OUTBOUND_PORT } from './outbound-port/hash-password.outbound-port';
import { SIGNUP_USER_OUTBOUND_PORT } from './outbound-port/signup-user.outbound-port';
import { SignUpUserService } from './service/signup-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmUser])],
  controllers: [SignUpUserController],
  providers: [
    { provide: SIGNUP_USER_INBOUND_PORT, useClass: SignUpUserService },
    { provide: SIGNUP_USER_OUTBOUND_PORT, useClass: SignUpUserRepository },
    {
      provide: GET_USER_BY_EMAIL_OUTBOUND_PORT,
      useClass: SignUpUserRepository,
    },
    {
      provide: GET_USER_BY_USERNAME_OUTBOUND_PORT,
      useClass: SignUpUserRepository,
    },
    {
      provide: HASH_PASSWORD_OUTBOUND_PORT,
      useClass: BcryptAdapter,
    },
    { provide: COMPARE_PASSWORD_OUTBOUND_PORT, useClass: BcryptAdapter },
  ],
})
export class UserModule {}
