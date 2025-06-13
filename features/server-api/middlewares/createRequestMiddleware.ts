import {ApiMiddleware} from "@/core/features/server-api/types";

export const createRequestMiddleware: ({prefix}: {prefix: string}) => ApiMiddleware =
  ({prefix}) =>
    ({req}, next) => {
      console.log(`${prefix}${prefix ? " " : ""}[${req.method}] ${req.url}`);
      return next();
    };
