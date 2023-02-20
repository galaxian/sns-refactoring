import { User } from '../entity/user.entity';

export const SIGNIN_USER_OUTBOUND_PORT = 'SIGNIN_USER_OUTBOUND_PORT' as const;

export interface SignInUserOutboundPort {
  excute(email: string): Promise<User>;
}
