import { User } from '../entity/user.entity';

export type GetUserByEmailOutboundPortInputDto = string;

export type GetUserByEmailOutboundPortOutputDto = User | null;

export const GET_USER_BY_EMAIL_OUTBOUND_PORT =
  'GET_USER_BY_EMAIL_OUTBOUND_PORT' as const;

export interface GetUserByEmailOutboundPort {
  getUserByEmail(
    email: GetUserByEmailOutboundPortInputDto,
  ): Promise<GetUserByEmailOutboundPortOutputDto>;
}
