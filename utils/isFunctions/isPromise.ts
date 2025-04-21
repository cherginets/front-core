export function isPromise<T = any>(value: unknown): value is Promise<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as any).then === 'function' &&
    typeof (value as any).catch === 'function'
  );
}