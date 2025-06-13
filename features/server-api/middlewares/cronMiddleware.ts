import {ApiMiddleware} from "@/core/features/server-api/types";
import {IS_DEV} from "@/core/constants";
import NotFoundError from "@/core/errors/http/NotFoundError";

const cronMiddleware: ApiMiddleware = async (ctx, next) => {
  // if (IS_DEV) {
  //   return next(ctx);
  // }

  const isNotOk = ctx.req.method === "GET" && !!process.env.CRONSECRET && process.env.CRONSECRET !== ctx.req.nextUrl.searchParams.get("cronsecret");

  if (isNotOk) {
    throw new NotFoundError(IS_DEV ? "Секретный ключ отсутствует или не подходит!" : undefined);
  }

  return next(ctx);
};

export default cronMiddleware;