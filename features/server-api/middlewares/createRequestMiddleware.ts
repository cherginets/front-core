import {ApiMiddleware} from "@/core/features/server-api/types";

export const createRequestMiddleware: ({prefix}: {prefix: string}) => ApiMiddleware =
  ({prefix}) =>
    async (ctx, next) => {

      console.log(`${prefix}${prefix ? " " : ""}[${ctx.req.method}] ${ctx.req.url}`);
      return await next(ctx);
    };
