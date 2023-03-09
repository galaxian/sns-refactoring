import { User } from '../entity/user.entity';

export const GET_USER_BY_USERNAME_OUTBOUND_PORT =
  'GET_USER_BY_USERNAME_OUTBOUND_PORT' as const;

export interface GetUserByUserNameOutboundPort {
  getUserByUserName(userName: string): Promise<User>;
}
