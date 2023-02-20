import { Inject, UnauthorizedException } from '@nestjs/common';
import { SignInUserInboundPortInputDto } from '../inbound-port/dto/req/signin-user.inbound-port.req.dto';
import { SignInUserInboundPortOutputDto } from '../inbound-port/dto/res/signin-user.inbound-port.res.dto';
import {
  SignInUserInboundPort,
  SIGNIN_USER_INBOUND_PORT,
} from '../inbound-port/signin-user.inbound-port';
import {
  ComparePasswordOutboundPort,
  COMPARE_PASSWORD_OUTBOUND_PORT,
} from '../outbound-port/compare-password.outbound-port';
import { SignInUserOutboundPort } from '../outbound-port/signin-user.outbound-port';

export class SignInUserService implements SignInUserInboundPort {
  constructor(
    @Inject(SIGNIN_USER_INBOUND_PORT)
    private readonly signInUserOutboundPort: SignInUserOutboundPort,
    @Inject(COMPARE_PASSWORD_OUTBOUND_PORT)
    private readonly comparePasswordOutboundPort: ComparePasswordOutboundPort,
  ) {}
  async excute(
    params: SignInUserInboundPortInputDto,
  ): Promise<SignInUserInboundPortOutputDto> {
    const { email, password } = params;
    const getUser = await this.signInUserOutboundPort.excute(email);

    const isValidPassword = this.comparePasswordOutboundPort.compare(
      password,
      getUser.password,
    );

    if (!isValidPassword || !getUser) {
      throw new UnauthorizedException();
    }

    return new SignInUserInboundPortOutputDto(undefined);
  }
}
