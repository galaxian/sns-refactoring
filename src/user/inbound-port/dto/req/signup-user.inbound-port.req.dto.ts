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
  private readonly _email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  private readonly _userName: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^.*(?=^.{10,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/)
  private readonly _password: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^.*(?=^.{10,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/)
  private readonly _checkPassword: string;
}
