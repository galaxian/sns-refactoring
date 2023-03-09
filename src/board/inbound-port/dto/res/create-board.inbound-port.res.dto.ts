import { Expose } from 'class-transformer';
import { Board } from 'src/board/entity/board.entity';

export class CreateBoardInboundPortOutputDto {
  @Expose({ name: 'id' })
  private readonly _id: bigint;

  constructor(board: Board) {
    this._id = board.id;
  }

  get id(): bigint {
    return this._id;
  }
}
