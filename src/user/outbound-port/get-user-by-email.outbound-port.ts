import { User } from '../entity/user.entity';

export const GET_USER_BY_EMAIL_OUTBOUND_PORT =
  'GET_USER_BY_EMAIL_OUTBOUND_PORT' as const;

export interface GetUserByEmailOutboundPort {
  getUserByEmail(email: string): Promise<User>;
}
