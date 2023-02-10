import { BadRequestException } from '@nestjs/common';
import { User } from '../entity/user.entity';
import {
  GetUserByEmailOutboundPort,
  GetUserByEmailOutboundPortOutputDto,
} from '../outbound-port/get-user-by-email.outbound-port';
import {
  GetUserByUserNameOutboundPort,
  GetUserByUserNameOutboundPortOutputDto,
} from '../outbound-port/get-user-by-username.outbound-port';
import {
  SignUpUserOutboundPort,
  SignUpUserOutboundPortInputDto,
  SignUpUserOutboundPortOutputDto,
} from '../outbound-port/signup-user.outbound-port';
import { SignUpUserService } from './signup-user.service';

class MockSignUpUserOutboundPort implements SignUpUserOutboundPort {
  private readonly result: SignUpUserOutboundPortOutputDto;

  constructor(result: SignUpUserOutboundPortOutputDto) {
    this.result = result;
  }

  async excute(
    params: SignUpUserOutboundPortInputDto,
  ): Promise<SignUpUserOutboundPortOutputDto> {
    return this.result;
  }
}

class MockGetUserByEmailOutboundPort implements GetUserByEmailOutboundPort {
  private readonly result: GetUserByEmailOutboundPortOutputDto;

  constructor(result: GetUserByEmailOutboundPortOutputDto) {
    this.result = result;
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.result === null ? null : this.result;
  }
}

class MockGetUserByUserNameOutboundPort
  implements GetUserByUserNameOutboundPort
{
  private readonly result: GetUserByUserNameOutboundPortOutputDto;

  constructor(result: GetUserByEmailOutboundPortOutputDto) {
    this.result = result;
  }

  async getUserByUserName(userName: string): Promise<User> {
    return this.result === null ? null : this.result;
  }
}

describe('signUpUserService test', () => {
  test('회원가입 성공', async () => {
    const input = {
      email: 'abcd@gmail.com',
      userName: 'abcd',
      password: 'abcd1234',
      checkPassword: 'abcd1234',
    };

    const signUpUserService = new SignUpUserService(
      new MockSignUpUserOutboundPort(),
      new MockGetUserByEmailOutboundPort(null),
      new MockGetUserByUserNameOutboundPort(null),
    );

    const result = await signUpUserService.excute(input);

    expect(result).toBe(void 0);
  });

  test('비밀번호 체크 실패', async () => {
    const input = {
      email: 'abcd@gmail.com',
      userName: 'abcd',
      password: 'abcd1234',
      checkPassword: 'abcd12345',
    };

    const signUpUserService = new SignUpUserService(
      new MockSignUpUserOutboundPort(),
      new MockGetUserByEmailOutboundPort(null),
      new MockGetUserByUserNameOutboundPort(null),
    );

    expect(async () => {
      await signUpUserService.excute(input);
    }).rejects.toThrowError(
      new BadRequestException({
        message: '비밀번호와 비밀번호 확인 값이 일치하지 않습니다.',
      }),
    );
  });
});
