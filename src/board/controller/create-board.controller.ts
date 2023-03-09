import { Body, Controller, Inject, Post } from '@nestjs/common';
import {
  CreateBoardInboundPort,
  CREATE_BOARD_INBOUND_PORT,
} from '../inbound-port/create-board.inbound-port';
import { CreateBoardInboundPortInputDto } from '../inbound-port/dto/req/create-board.inbound-port.req.dto';
import { CreateBoardInboundPortOutputDto } from '../inbound-port/dto/res/create-board.inbound-port.res.dto';

@Controller()
export class CreateBoardController {
  constructor(
    @Inject(CREATE_BOARD_INBOUND_PORT)
    private readonly createBoardInboundPort: CreateBoardInboundPort,
  ) {}

  @Post('/posts')
  async handle(
    @Body() request: CreateBoardInboundPortInputDto,
  ): Promise<CreateBoardInboundPortOutputDto> {
    return this.createBoardInboundPort.excute(request);
  }
}
