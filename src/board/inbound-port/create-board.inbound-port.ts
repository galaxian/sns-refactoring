import { CreateBoardInboundPortInputDto } from './dto/req/create-board.inbound-port.req.dto';
import { CreateBoardInboundPortOutputDto } from './dto/res/create-board.inbound-port.res.dto';

export const CREATE_BOARD_INBOUND_PORT = 'CREATE_BOARD_INBOUND_PORT' as const;

export interface CreateBoardInboundPort {
  excute(
    params: CreateBoardInboundPortInputDto,
  ): Promise<CreateBoardInboundPortOutputDto>;
}
