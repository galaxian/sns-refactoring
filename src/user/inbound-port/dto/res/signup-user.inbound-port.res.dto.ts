import { Expose } from 'class-transformer';
import { User } from 'src/user/entity/user.entity';

export class SignUpUserInboundPortOutputDto {
  @Expose({ name: 'id' })
  private readonly _id: bigint;

  constructor(user: User) {
    this._id = user.id;
  }

  get id(): bigint {
    return this._id;
  }
}
