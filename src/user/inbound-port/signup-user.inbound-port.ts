import { SignUpUserInboundPortInputDto } from './dto/req/signup-user.inbound-port.req.dto';
import { SignUpUserInboundPortOutputDto } from './dto/res/signup-user.inbound-port.res.dto';

export const SIGNUP_USER_INBOUND_PORT = 'SIGNUP_USER_INBOUND_PORT' as const;

export interface SignUpUserInboundPort {
  excute(
    params: SignUpUserInboundPortInputDto,
  ): Promise<SignUpUserInboundPortOutputDto>;
}
