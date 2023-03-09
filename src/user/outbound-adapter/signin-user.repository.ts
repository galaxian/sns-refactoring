import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmUser } from '../entity/typeorm-user.entity';
import { User } from '../entity/user.entity';
import { SignInUserOutboundPort } from '../outbound-port/signin-user.outbound-port';

@Injectable()
export class SignInUserRepository implements SignInUserOutboundPort {
  constructor(
    @InjectRepository(TypeOrmUser)
    private readonly userRepository: Repository<TypeOrmUser>,
  ) {}

  async excute(email: string): Promise<User> {
    const ormUser = await this.userRepository.findOne({ where: { email } });
    return User.toEntityFromORM(ormUser);
  }
}
