import { User } from '../entity/user.entity';
import { ComparePasswordOutboundPort } from '../outbound-port/compare-password.outbound-port';
import { CreateJwtOutBoundPort } from '../outbound-port/create-jwt.outbound-port';
import { SignInUserOutboundPort } from '../outbound-port/signin-user.outbound-port';
import { Payload } from '../payload/token-payload';

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
    if ('hash' + password === checkPassword) {
      return true;
    }
    return false;
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
