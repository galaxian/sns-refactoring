import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmUser } from '../entity/typeorm-user.entity';
import { User } from '../entity/user.entity';
import { GetUserByEmailOutboundPort } from '../outbound-port/get-user-by-email.outbound-port';
import { GetUserByUserNameOutboundPort } from '../outbound-port/get-user-by-username.outbound-port';
import {
  SignUpUserOutboundPort,
  SignUpUserOutboundPortInputDto,
  SignUpUserOutboundPortOutputDto,
} from '../outbound-port/signup-user.outbound-port';

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
  async excute(
    params: SignUpUserOutboundPortInputDto,
  ): Promise<SignUpUserOutboundPortOutputDto> {
    const user = this.userRepository.create(params);
    return (await this.userRepository.save(user)).toEntity();
  }

  async getUserByEmail(email: string): Promise<User> {
    const getUser = await this.userRepository.findOne({ where: { email } });
    return getUser === null ? null : getUser.toEntity();
  }

  async getUserByUserName(userName: string): Promise<User> {
    const getUser = await this.userRepository.findOne({ where: { userName } });
    return getUser === null ? null : getUser.toEntity();
  }
}
