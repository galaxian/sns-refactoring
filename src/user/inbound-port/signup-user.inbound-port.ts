export type SignUpUserInboundPortInputDto = {
  email: string;
  userName: string;
  password: string;
  checkPassword: string;
};

export type SignUpUserInboundPortOutputDto = void;

export const SIGNUP_USER_INBOUND_PORT = 'SIGNUP_USER_INBOUND_PORT' as const;

export interface SignUpUserInboundPort {
  excute(
    params: SignUpUserInboundPortInputDto,
  ): Promise<SignUpUserInboundPortOutputDto>;
}
