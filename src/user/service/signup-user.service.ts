import { BadRequestException, Inject } from '@nestjs/common';
import { User } from '../entity/user.entity';
import {
  SignUpUserInboundPort,
  SignUpUserInboundPortInputDto,
  SignUpUserInboundPortOutputDto,
} from '../inbound-port/signup-user.inbound-port';
import {
  GetUserByEmailOutboundPort,
  GET_USER_BY_EMAIL_OUTBOUND_PORT,
} from '../outbound-port/get-user-by-email.outbound-port';
import {
  GetUserByUserNameOutboundPort,
  GET_USER_BY_USERNAME_OUTBOUND_PORT,
} from '../outbound-port/get-user-by-username.outbound-port';
import {
  SignUpUserOutboundPort,
  SIGNUP_USER_OUTBOUND_PORT,
} from '../outbound-port/signup-user.outbound-port';

export class SignUpUserService implements SignUpUserInboundPort {
  constructor(
    @Inject(SIGNUP_USER_OUTBOUND_PORT)
    private readonly signUpUserOutboundPort: SignUpUserOutboundPort,
    @Inject(GET_USER_BY_EMAIL_OUTBOUND_PORT)
    private readonly getUserByEmailOutboundPort: GetUserByEmailOutboundPort,
    @Inject(GET_USER_BY_USERNAME_OUTBOUND_PORT)
    private readonly getUserByUserNameOutboundPort: GetUserByUserNameOutboundPort,
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

    const getUserByEmail = await this.getUserByEmailOutboundPort.getUserByEmail(
      email,
    );
    if (getUserByEmail) {
      throw new BadRequestException('이미 등록된 이메일입니다.');
    }

    const getUserByUserName =
      await this.getUserByUserNameOutboundPort.getUserByUserName(userName);
    if (getUserByUserName) {
      throw new BadRequestException('이미 등록된 사용자명입니다.');
    }

    const signupUser = User.createSignUpUser(
      email,
      userName,
      password,
      checkPassword,
    );

    return (await this.signUpUserOutboundPort.excute(signupUser)).id;
  }

  private isPasswordValidate(password: string, checkPassword: string): boolean {
    return password !== checkPassword;
  }
}
