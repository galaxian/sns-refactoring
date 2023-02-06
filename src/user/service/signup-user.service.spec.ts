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
});
