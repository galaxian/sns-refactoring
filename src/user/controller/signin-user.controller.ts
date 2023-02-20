import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SignInUserInboundPortInputDto } from '../inbound-port/dto/req/signin-user.inbound-port.req.dto';
import { SignInUserInboundPortOutputDto } from '../inbound-port/dto/res/signin-user.inbound-port.res.dto';
import {
  SignInUserInboundPort,
  SIGNIN_USER_INBOUND_PORT,
} from '../inbound-port/signin-user.inbound-port';

@Controller()
export class SignInUserController {
  constructor(
    @Inject(SIGNIN_USER_INBOUND_PORT)
    private readonly signInUserInboundPort: SignInUserInboundPort,
  ) {}

  @Post('/users/signin')
  async handle(
    @Body() request: SignInUserInboundPortInputDto,
  ): Promise<SignInUserInboundPortOutputDto> {
    return this.signInUserInboundPort.excute(request);
  }
}
