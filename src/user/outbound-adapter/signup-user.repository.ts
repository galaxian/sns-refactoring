import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmUser } from '../entity/typeorm-user.entity';
import { User } from '../entity/user.entity';
import { GetUserByEmailOutboundPort } from '../outbound-port/get-user-by-email.outbound-port';
import { GetUserByUserNameOutboundPort } from '../outbound-port/get-user-by-username.outbound-port';
import { SignUpUserOutboundPort } from '../outbound-port/signup-user.outbound-port';

@Injectable()
export class SignUpUserRepository
  implements
    SignUpUserOutboundPort,
    GetUserByEmailOutboundPort,
    GetUserByUserNameOutboundPort
{
  constructor(
    @InjectRepository(TypeOrmUser)
    private readonly userRepository: Repository<TypeOrmUser>,
  ) {}
  async excute(params: User): Promise<User> {
    const user = this.userRepository.create(params);
    const ormUser = await this.userRepository.save(user);
    return User.toEntityFromORM(ormUser);
  }

  async getUserByEmail(email: string): Promise<User> {
    const getORMUser = await this.userRepository.findOne({ where: { email } });
    return User.toEntityFromORM(getORMUser);
  }

  async getUserByUserName(userName: string): Promise<User> {
    const getORMUser = await this.userRepository.findOne({
      where: { userName },
    });
    return User.toEntityFromORM(getORMUser);
  }
}
