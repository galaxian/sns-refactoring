export const COMPARE_PASSWORD_OUTBOUND_PORT =
  'COMPARE_PASSWORD_OUTBOUND_PORT' as const;

export interface ComparePasswordOutboundPort {
  compare(password: string, checkPassword: string): Promise<boolean>;
}
