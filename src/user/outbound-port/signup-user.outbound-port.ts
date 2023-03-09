import { User } from '../entity/user.entity';

export const SIGNUP_USER_OUTBOUND_PORT = 'SIGNUP_USER_OUTBOUND_PORT' as const;

export interface SignUpUserOutboundPort {
  excute(params: User): Promise<User>;
}
