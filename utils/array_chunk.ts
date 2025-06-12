export function array_chunks<T = any>(arr: T[], n: number): T[][] {
  return arr.reduce(
    (acc, item: T) => {
      if (acc[acc.length - 1].length < n) {
        acc[acc.length - 1].push(item);
      } else {
        acc.push([item]);
      }
      return acc;
    },
    [[]] as T[][]
  );
}
