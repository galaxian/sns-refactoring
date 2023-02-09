import { TimeStampableEntity } from 'src/util/entity/timestampe.entity';
import { Column } from 'typeorm/decorator/columns/Column';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { User } from './user.entity';

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

  toEntity(): User {
    return new User(this.email, this.userName, this.password);
  }
}
