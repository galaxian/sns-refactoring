export const HASH_PASSWORD_OUTBOUND_PORT =
  'HASH_PASSWORD_OUTBOUND_PORT' as const;

export interface HashPasswordOutboundPort {
  hash(params: string): Promise<string>;
}
