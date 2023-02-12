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

    const saveUser = {
      id: BigInt(1),
      email: 'abcd@gmail.com',
      userName: 'abcd',
      password: 'hash',
    };

    const getUserByEmail = null;
    const getUserByUserName = null;

    const signUpUserService = new SignUpUserService(
      new MockSignUpUserOutboundPort(saveUser),
      new MockGetUserByEmailOutboundPort(getUserByEmail),
      new MockGetUserByUserNameOutboundPort(getUserByUserName),
    );

    const result = await signUpUserService.excute(input);

    expect(result).toEqual(BigInt(1));
  });

  test('비밀번호 체크 실패', async () => {
    const input = {
      email: 'abcd@gmail.com',
      userName: 'abcd',
      password: 'abcd1234',
      checkPassword: 'abcd12345',
    };

    const saveUser = {
      id: BigInt(1),
      email: 'abcd@gmail.com',
      userName: 'abcd',
      password: 'hash',
    };

    const getUserByEmail = null;
    const getUserByUserName = null;

    const signUpUserService = new SignUpUserService(
      new MockSignUpUserOutboundPort(saveUser),
      new MockGetUserByEmailOutboundPort(getUserByEmail),
      new MockGetUserByUserNameOutboundPort(getUserByUserName),
    );

    expect(async () => {
      await signUpUserService.excute(input);
    }).rejects.toThrowError(
      new BadRequestException({
        message: '비밀번호와 비밀번호 확인 값이 일치하지 않습니다.',
      }),
    );
  });

  test('중복된 이메일로 회원가입', async () => {
    const input = {
      email: 'abcd@gmail.com',
      userName: 'abcd',
      password: 'abcd1234',
      checkPassword: 'abcd1234',
    };

    const testUser: User = User.createMockUser(
      BigInt(2),
      input.email,
      input.userName,
      'hash',
    );

    const getUserByEmail = User.createMockUser(
      BigInt(1),
      input.email,
      'test',
      'hash',
    );
    const getUserByUserName = null;

    const signUpUserService = new SignUpUserService(
      new MockSignUpUserOutboundPort(testUser),
      new MockGetUserByEmailOutboundPort(getUserByEmail),
      new MockGetUserByUserNameOutboundPort(getUserByUserName),
    );

    expect(getUserByEmail.email).toEqual(testUser.email);
    expect(async () => {
      await signUpUserService.excute(input);
    }).rejects.toThrowError(
      new BadRequestException({
        message: '이미 등록된 이메일입니다.',
      }),
    );
  });

  test('중복된 닉네임으로 회원가입', async () => {
    const input = {
      email: 'abcd@gmail.com',
      userName: 'abcd',
      password: 'abcd1234',
      checkPassword: 'abcd1234',
    };

    const testUser: User = User.createMockUser(
      BigInt(2),
      input.email,
      input.userName,
      'hash',
    );

    const getUserByEmail = null;
    const getUserByUserName = User.createMockUser(
      BigInt(1),
      'test',
      input.userName,
      'hash',
    );

    const signUpUserService = new SignUpUserService(
      new MockSignUpUserOutboundPort(testUser),
      new MockGetUserByEmailOutboundPort(getUserByEmail),
      new MockGetUserByUserNameOutboundPort(getUserByUserName),
    );

    expect(getUserByUserName.userName).toEqual(testUser.userName);
    expect(async () => {
      await signUpUserService.excute(input);
    }).rejects.toThrowError(
      new BadRequestException({
        message: '이미 등록된 사용자명입니다.',
      }),
    );
  });
});
