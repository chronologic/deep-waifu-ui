
export function isTruthy(value: string): boolean {
  // eslint-disable-next-line eqeqeq
  return value === 'true' || value == '1';
}

export function shortAddress(address?: string | null | undefined, chars = 4): string {
  const addr = (address || '').toUpperCase();
  return `0x${addr.substr(2, chars)}...${addr.substr(-chars)}`;
}
