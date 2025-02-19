import NodeCache from "node-cache";

const defaultCache = new NodeCache({stdTTL: 10, checkperiod: 0});

// todo дописать что бы коллбек функция могла принимать аргументы
// todo дописать что бы revalidate использовался
export default async function cacheAsyncFunction<ResultType>(
  params: {
    id: string;
    cache?: typeof defaultCache;
  },
  foo: () => Promise<ResultType>
): Promise<ResultType> {
  const id = params.id;
  const cache = params.cache || defaultCache;

  if (cache.has(id)) {
    return cache.get(id)!;
  }
  const result = await foo();
  cache.set(id, result);
  return result;
}
