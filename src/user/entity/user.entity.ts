import { BadRequestException } from '@nestjs/common';
import { TypeOrmUser } from './typeorm-user.entity';

export class User {
  private _id: bigint;
  private _email: string;
  private _userName: string;
  private _password: string;
  private _createAt: Date;
  private _updateAt: Date;
  private _deleteAt: Date;

  public static createSignUpUser(
    email: string,
    userName: string,
    password: string,
    checkPassword: string,
  ): User {
    if (password !== checkPassword) {
      throw new BadRequestException();
    }
    const user = new User();
    user._email = email;
    user._userName = userName;
    user._password = password;
    return user;
  }

  public static toEntityFromORM(ormUser: TypeOrmUser): User {
    if (ormUser === null) {
      return null;
    }
    const user = new User();
    user._id = ormUser.id;
    user._email = ormUser.email;
    user._userName = ormUser.userName;
    user._password = ormUser.password;
    user._createAt = ormUser.createAt;
    user._updateAt = ormUser.updateAt;
    user._deleteAt = ormUser.deleteAt;
    return user;
  }

  get id(): bigint {
    return this._id;
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

  get createAt(): Date {
    return this._createAt;
  }

  get updateAt(): Date {
    return this._updateAt;
  }

  get deleteAt(): Date {
    return this._deleteAt;
  }
}
