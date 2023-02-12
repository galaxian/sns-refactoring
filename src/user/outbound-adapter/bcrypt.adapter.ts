import * as bcrypt from 'bcrypt';
import { HashPasswordOutboundPort } from '../outbound-port/hash-password.outbound-port';

export class BcryptAdapter implements HashPasswordOutboundPort {
  async hash(password: string): Promise<string> {
    const saltOnTime = 10;
    return await bcrypt.hash(password, saltOnTime);
  }
}
