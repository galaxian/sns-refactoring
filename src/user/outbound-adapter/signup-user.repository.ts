import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmUser } from '../entity/typeorm-user.entity';
import {
  SignUpUserOutboundPort,
  SignUpUserOutboundPortInputDto,
  SignUpUserOutboundPortOutputDto,
} from '../outbound-port/signup-user.outbound-port';

@Injectable()
export class SignUpUserRepository implements SignUpUserOutboundPort {
  constructor(
    @InjectRepository(TypeOrmUser)
    private readonly userRepository: Repository<TypeOrmUser>,
  ) {}
  async excute(
    params: SignUpUserOutboundPortInputDto,
  ): Promise<SignUpUserOutboundPortOutputDto> {
    const user = this.userRepository.create(params);
    await this.userRepository.save(user);
  }
}
