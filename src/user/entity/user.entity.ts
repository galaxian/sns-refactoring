export class User {
  private _id: bigint;
  private _email: string;
  private _userName: string;
  private _password: string;
  private _createAt: Date;
  private _updateAt: Date;
  private _deleteAt: Date;

  constructor(email: string, userName: string, password: string) {
    this._email = email;
    this._userName = userName;
    this._password = password;
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
