type AggregatedArray<T> = [key: string | number, items: T[]][];

export default function arrayAggregate<T>(array: T[], key: keyof T): AggregatedArray<T> {
  const map = new Map<string | number, T[]>();

  for (const item of array) {
    const groupKey = item[key] as string | number;
    if (!map.has(groupKey)) {
      map.set(groupKey, []);
    }
    map.get(groupKey)!.push(item);
  }

  return Array.from(map.entries());
}