import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateBoardInboundPortInputDto {
  @IsNotEmpty()
  @Expose({ name: 'content' })
  private readonly _content: string;

  constructor(content: string) {
    this._content = content;
  }

  get content(): string {
    return this._content;
  }
}
