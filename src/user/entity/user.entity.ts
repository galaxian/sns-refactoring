export class User {
  private _email: string;
  private _userName: string;
  private _password: string;

  constructor(email: string, userName: string, password: string) {
    this._email = email;
    this._userName = userName;
    this._password = password;
  }

  get email() {
    return this._email;
  }

  get userName() {
    return this._userName;
  }

  get password() {
    return this._password;
  }
}
