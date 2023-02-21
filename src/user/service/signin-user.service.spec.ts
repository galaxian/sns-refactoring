import { NotFoundException } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { SignInUserInboundPortInputDto } from '../inbound-port/dto/req/signin-user.inbound-port.req.dto';
import { SignInUserInboundPortOutputDto } from '../inbound-port/dto/res/signin-user.inbound-port.res.dto';
import { ComparePasswordOutboundPort } from '../outbound-port/compare-password.outbound-port';
import { CreateJwtOutBoundPort } from '../outbound-port/create-jwt.outbound-port';
import { SignInUserOutboundPort } from '../outbound-port/signin-user.outbound-port';
import { Payload } from '../payload/token-payload';
import { SignInUserService } from './signin-user.service';

class MockSignInUserOutboundPort implements SignInUserOutboundPort {
  private readonly result: User;

  constructor(result: User) {
    this.result = result;
  }

  async excute(email: string): Promise<User> {
    return this.result === null ? null : this.result;
  }
}

class MockComparePasswordOutboundPort implements ComparePasswordOutboundPort {
  private readonly result: boolean;

  constructor(result: boolean) {
    this.result = result;
  }

  async compare(password: string, checkPassword: string): Promise<boolean> {
    return this.result;
  }
}

class MockCreateJwtOutBoundPort implements CreateJwtOutBoundPort {
  private readonly result: string;

  constructor(result: string) {
    this.result = result;
  }

  async sign(payload: Payload): Promise<string> {
    return this.result;
  }
}

describe('sigInUserService test', () => {
  test('로그인 성공', async () => {
    const input = new SignInUserInboundPortInputDto(
      'abcd1234@gmail.com',
      'abcd1234!!',
    );

    const getUser = User.createMockUser(
      BigInt(1),
      input.email,
      'testUserName',
      'hash' + input.password,
    );

    const isEqualHashPassword = true;
    const createJwt = 'jwt';

    const signInUserService = new SignInUserService(
      new MockSignInUserOutboundPort(getUser),
      new MockComparePasswordOutboundPort(isEqualHashPassword),
      new MockCreateJwtOutBoundPort(createJwt),
    );

    const result: SignInUserInboundPortOutputDto =
      await signInUserService.excute(input);

    expect(result.accessToken).toEqual(createJwt);
  });

  test('email 조회 불가 로그인 실패', async () => {
    const input = new SignInUserInboundPortInputDto(
      'abcd1234@gmail.com',
      'abcd1234!!',
    );

    const getUser = null;

    const isEqualHashPassword = true;
    const createJwt = 'jwt';

    const signInUserService = new SignInUserService(
      new MockSignInUserOutboundPort(getUser),
      new MockComparePasswordOutboundPort(isEqualHashPassword),
      new MockCreateJwtOutBoundPort(createJwt),
    );

    expect(async () => {
      await signInUserService.excute(input);
    }).rejects.toThrowError(
      new NotFoundException('존재하지 않는 사용자입니다.'),
    );
  });
});
