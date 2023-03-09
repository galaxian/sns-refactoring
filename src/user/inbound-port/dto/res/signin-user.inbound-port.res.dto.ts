import { Expose } from 'class-transformer';

export class SignInUserInboundPortOutputDto {
  @Expose({ name: 'accessToken' })
  private readonly _accessToken: string;

  constructor(jwtToken: string) {
    this._accessToken = jwtToken;
  }

  get accessToken(): string {
    return this._accessToken;
  }
}
