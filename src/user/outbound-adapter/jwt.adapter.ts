import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateJwtOutBoundPort } from '../outbound-port/create-jwt.outbound-port';
import { Payload } from '../payload/token-payload';

@Injectable()
export class JwtAdapter implements CreateJwtOutBoundPort {
  constructor(private readonly jwtService: JwtService) {}

  async sign(payload: Payload): Promise<string> {
    return this.jwtService.sign(payload.instanceToPlain());
  }
}
