import { TypeOrmUser } from 'src/user/entity/typeorm-user.entity';
import { TimeStampableEntity } from 'src/util/entity/timestampe.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TypeOrmBoard extends TimeStampableEntity {
  @PrimaryGeneratedColumn('increment')
  id: bigint;

  @Column({ type: 'varchar' })
  content: string;

  @ManyToOne(() => TypeOrmUser, (user) => user.board, { eager: false })
  user: TypeOrmUser;
}
