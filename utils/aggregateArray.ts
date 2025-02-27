/**
 *
 * @param arr массив для агрегации
 * @param getAggregatedValue должна отдавать ключ, по которому агрегируем массив
 */
export const aggregateArray = function <T extends any, V>(arr: T[], getAggregatedValue: (row: T) => V) {
  const map = new Map<V, T[]>();

  for (const item of arr) {
    const key = getAggregatedValue(item);
    if (!map.has(key)) map.set(key, []);

    map.get(key)!.push(item);
  }

  return map;
};
