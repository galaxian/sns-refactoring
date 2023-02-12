import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  SignUpUserInboundPort,
  SignUpUserInboundPortInputDto,
  SIGNUP_USER_INBOUND_PORT,
} from '../inbound-port/signup-user.inbound-port';

@Controller()
export class SignUpUserController {
  constructor(
    @Inject(SIGNUP_USER_INBOUND_PORT)
    private readonly signUpUserInboundPort: SignUpUserInboundPort,
  ) {}

  @Post('/users/signup')
  async handle(@Body() request: SignUpUserInboundPortInputDto) {
    return this.signUpUserInboundPort.excute(request);
  }
}
