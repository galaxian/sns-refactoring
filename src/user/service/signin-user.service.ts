import {
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInUserInboundPortInputDto } from '../inbound-port/dto/req/signin-user.inbound-port.req.dto';
import { SignInUserInboundPortOutputDto } from '../inbound-port/dto/res/signin-user.inbound-port.res.dto';
import { SignInUserInboundPort } from '../inbound-port/signin-user.inbound-port';
import {
  ComparePasswordOutboundPort,
  COMPARE_PASSWORD_OUTBOUND_PORT,
} from '../outbound-port/compare-password.outbound-port';
import {
  CreateJwtOutBoundPort,
  CREATE_JWT_OUTBOUND_PORT,
} from '../outbound-port/create-jwt.outbound-port';
import {
  SignInUserOutboundPort,
  SIGNIN_USER_OUTBOUND_PORT,
} from '../outbound-port/signin-user.outbound-port';
import { Payload } from '../payload/token-payload';

export class SignInUserService implements SignInUserInboundPort {
  constructor(
    @Inject(SIGNIN_USER_OUTBOUND_PORT)
    private readonly signInUserOutboundPort: SignInUserOutboundPort,
    @Inject(COMPARE_PASSWORD_OUTBOUND_PORT)
    private readonly comparePasswordOutboundPort: ComparePasswordOutboundPort,
    @Inject(CREATE_JWT_OUTBOUND_PORT)
    private readonly createJwtOutboundPort: CreateJwtOutBoundPort,
  ) {}
  async excute(
    params: SignInUserInboundPortInputDto,
  ): Promise<SignInUserInboundPortOutputDto> {
    const { email, password } = params;
    const getUser = await this.signInUserOutboundPort.excute(email);

    if (!getUser) {
      throw new NotFoundException('존재하지 않는 사용자입니다.');
    }

    const isValidPassword = await this.comparePasswordOutboundPort.compare(
      password,
      getUser.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
    }

    const payload = new Payload(getUser.id);

    const accessToken = await this.createJwtOutboundPort.sign(payload);

    return new SignInUserInboundPortOutputDto(accessToken);
  }
}
