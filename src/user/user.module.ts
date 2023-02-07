import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignUpUserController } from './controller/signup-user.controller';
import { TypeOrmUser } from './entity/typeorm-user.entity';
import { SIGNUP_USER_INBOUND_PORT } from './inbound-port/signup-user.inbound-port';
import { SignUpUserService } from './service/signup-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmUser])],
  controllers: [SignUpUserController],
  providers: [
    { provide: SIGNUP_USER_INBOUND_PORT, useClass: SignUpUserService },
  ],
})
export class UserModule {}
