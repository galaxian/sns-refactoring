import { User } from '../entity/user.entity';

export type GetUserByUserNameOutboundPortInputDto = string;

export type GetUserByUserNameOutboundPortOutputDto = User | null;

export const GET_USER_BY_USERNAME_OUTBOUND_PORT =
  'GET_USER_BY_USERNAME_OUTBOUND_PORT' as const;

export interface GetUserByUserNameOutboundPort {
  getUserByUserName(
    userName: GetUserByUserNameOutboundPortInputDto,
  ): Promise<GetUserByUserNameOutboundPortOutputDto>;
}
