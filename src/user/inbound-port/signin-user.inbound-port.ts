import { SignInUserInboundPortInputDto } from './dto/req/signin-user.inbound-port.req.dto';
import { SignInUserInboundPortOutputDto } from './dto/res/signin-user.inbound-port.res.dto';

export const SIGNIN_USER_INBOUND_PORT = 'SIGNIN_USER_INBOUND_PORT' as const;

export interface SignInUserInboundPort {
  excute(
    params: SignInUserInboundPortInputDto,
  ): Promise<SignInUserInboundPortOutputDto>;
}
