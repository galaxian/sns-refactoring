import { Payload } from '../payload/token-payload';

export const CREATE_JWT_OUTBOUND_PORT = 'CREATE_JWT_OUTBOUND_PORT' as const;

export interface CreateJwtOutBoundPort {
  sign(payload: Payload): Promise<string>;
}
