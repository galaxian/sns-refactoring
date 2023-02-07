import { TimeStampableEntity } from 'src/util/entity/timestampe.entity';
import { Column } from 'typeorm/decorator/columns/Column';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';

@Entity()
export class TypeOrmUser extends TimeStampableEntity {
  @PrimaryGeneratedColumn('increment')
  id: bigint;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', unique: true, length: 14 })
  userName: string;

  @Column({ type: 'varchar' })
  password: string;
}
