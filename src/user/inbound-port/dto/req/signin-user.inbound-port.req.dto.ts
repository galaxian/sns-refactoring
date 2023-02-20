import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class SignInUserInboundPortInputDto {
  @IsNotEmpty()
  @IsEmail()
  @Expose({ name: 'email' })
  private readonly _email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^.*(?=^.{10,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/)
  @Expose({ name: 'password' })
  private readonly _password: string;

  constructor(email: string, password: string) {
    this._email = email;
    this._password = password;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }
}
