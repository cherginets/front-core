import NodeCache from "node-cache";

const myCache = new NodeCache({ stdTTL: 3, checkperiod: 0 });

export default async function cacheAsyncFunction<ResultType>(
  foo: (...a: any[]) => Promise<ResultType>,
  params: {
    revalidate?: number;
  } = {},
) {
  return foo();
}
