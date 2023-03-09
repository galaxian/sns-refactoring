import { Board } from '../entity/board.entity';

export const CREATE_BOARD_OUTBOUND_PORT = 'CREATE_BOARD_OUTBOUND_PORT' as const;

export interface CreatBoardOutboundPort {
  excute(board: Board): Promise<Board>;
}
