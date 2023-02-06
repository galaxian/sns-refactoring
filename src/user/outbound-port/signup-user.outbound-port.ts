export type SignUpUserOutboundPortInputDto = {
  email: string;
  userName: string;
  password: string;
};

export type SignUpUserOutboundPortOutputDto = void;

export const SIGNUP_USER_OUTBOUND_PORT = 'SIGNUP_USER_OUTBOUND_PORT' as const;

export interface SignUpUserOutboundPort {
  excute(
    params: SignUpUserOutboundPortInputDto,
  ): Promise<SignUpUserOutboundPortOutputDto>;
}
