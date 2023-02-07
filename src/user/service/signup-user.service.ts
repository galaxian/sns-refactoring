import { BadRequestException, Inject } from '@nestjs/common';
import { User } from '../entity/user.entity';
import {
  SignUpUserInboundPort,
  SignUpUserInboundPortInputDto,
  SignUpUserInboundPortOutputDto,
} from '../inbound-port/signup-user.inbound-port';
import {
  SignUpUserOutboundPort,
  SIGNUP_USER_OUTBOUND_PORT,
} from '../outbound-port/signup-user.outbound-port';

export class SignUpUserService implements SignUpUserInboundPort {
  constructor(
    @Inject(SIGNUP_USER_OUTBOUND_PORT)
    private readonly signUpUserOutboundPort: SignUpUserOutboundPort,
  ) {}
  async excute(
    params: SignUpUserInboundPortInputDto,
  ): Promise<SignUpUserInboundPortOutputDto> {
    const { email, userName, password, checkPassword } = params;
    if (this.isPasswordValidate(password, checkPassword)) {
      throw new BadRequestException(
        '비밀번호와 비밀번호 확인 값이 일치하지 않습니다.',
      );
    }

    const signupUser = new User(email, userName, password);

    this.signUpUserOutboundPort.excute(signupUser);
  }

  private isPasswordValidate(password: string, checkPassword: string): boolean {
    return password !== checkPassword;
  }
}
