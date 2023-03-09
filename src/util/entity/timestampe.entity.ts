import { CreateDateColumn } from 'typeorm/decorator/columns/CreateDateColumn';
import { DeleteDateColumn } from 'typeorm/decorator/columns/DeleteDateColumn';
import { UpdateDateColumn } from 'typeorm/decorator/columns/UpdateDateColumn';

export class TimeStampableEntity {
  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @DeleteDateColumn()
  deleteAt: Date;
}
