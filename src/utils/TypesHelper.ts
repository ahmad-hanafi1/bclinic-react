type FallbackValues = string | Record<number, string> | Date;

export function ensureValue<T extends FallbackValues>(
  data: T | false,
  fallback: T
): T {
  return data === false ? fallback : data;
}
