import * as bcrypt from 'bcrypt';
import { ComparePasswordOutboundPort } from '../outbound-port/compare-password.outbound-port';
import { HashPasswordOutboundPort } from '../outbound-port/hash-password.outbound-port';

export class BcryptAdapter
  implements HashPasswordOutboundPort, ComparePasswordOutboundPort
{
  async hash(password: string): Promise<string> {
    const saltOnTime = 10;
    return await bcrypt.hash(password, saltOnTime);
  }

  async compare(password: string, checkPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, checkPassword);
  }
}
