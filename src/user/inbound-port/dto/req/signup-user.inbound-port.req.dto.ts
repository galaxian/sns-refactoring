import { User } from 'src/user/entity/user.entity';
import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpUserInboundPortInputDto {
  @IsEmail()
  @IsNotEmpty()
  @Expose({ name: 'email' })
  private readonly _email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  @Expose({ name: 'userName' })
  private readonly _userName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^.*(?=^.{10,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/)
  @Expose({ name: 'password' })
  private readonly _password: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^.*(?=^.{10,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/)
  @Expose({ name: 'checkPassword' })
  private readonly _checkPassword: string;

  constructor(
    email: string,
    userName: string,
    password: string,
    checkPassword: string,
  ) {
    this._email = email;
    this._userName = userName;
    this._password = password;
    this._checkPassword = checkPassword;
  }

  get email(): string {
    return this._email;
  }

  get userName(): string {
    return this._userName;
  }

  get password(): string {
    return this._password;
  }

  get checkPassword(): string {
    return this._checkPassword;
  }

  public toEntity(): User {
    return User.createSignUpUser(
      this._email,
      this._userName,
      this._password,
      this._checkPassword,
    );
  }
}
