import { User } from 'src/user/entity/user.entity';

export class Board {
  private _id: bigint;
  private _content: string;
  private _user: User;
  private _createAt: Date;
  private _updateAt: Date;
  private _deleteAt: Date;

  public static createBoard(content: string, user: User): Board {
    const board = new Board();
    board._content = content;
    board._user = user;
    return board;
  }

  get id(): bigint {
    return this._id;
  }

  get content(): string {
    return this._content;
  }
}
