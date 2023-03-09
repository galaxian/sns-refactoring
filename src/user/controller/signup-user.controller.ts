import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SignUpUserInboundPortInputDto } from '../inbound-port/dto/req/signup-user.inbound-port.req.dto';
import { SignUpUserInboundPortOutputDto } from '../inbound-port/dto/res/signup-user.inbound-port.res.dto';
import {
  SignUpUserInboundPort,
  SIGNUP_USER_INBOUND_PORT,
} from '../inbound-port/signup-user.inbound-port';

@Controller()
export class SignUpUserController {
  constructor(
    @Inject(SIGNUP_USER_INBOUND_PORT)
    private readonly signUpUserInboundPort: SignUpUserInboundPort,
  ) {}

  @Post('/users/signup')
  async handle(
    @Body() request: SignUpUserInboundPortInputDto,
  ): Promise<SignUpUserInboundPortOutputDto> {
    return this.signUpUserInboundPort.excute(request);
  }
}
