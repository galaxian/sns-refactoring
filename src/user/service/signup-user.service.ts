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
  HashPasswordOutboundPort,
  HASH_PASSWORD_OUTBOUND_PORT,
} from '../outbound-port/hash-password.outbound-port';
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
    @Inject(HASH_PASSWORD_OUTBOUND_PORT)
    private readonly hashPasswordOutboundPort: HashPasswordOutboundPort,
  ) {}
  async excute(
    params: SignUpUserInboundPortInputDto,
  ): Promise<SignUpUserInboundPortOutputDto> {
    const { email, userName, password, checkPassword } = params;

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

    const hashPassword: string = await this.hashPasswordOutboundPort.hash(
      password,
    );

    signupUser.hashPassword(hashPassword);

    return (await this.signUpUserOutboundPort.excute(signupUser)).id;
  }
}
