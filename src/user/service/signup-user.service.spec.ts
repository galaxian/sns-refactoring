import { BadRequestException } from '@nestjs/common';
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
