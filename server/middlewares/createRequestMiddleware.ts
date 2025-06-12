import {ApiMiddleware} from "@/core/server/types";

export const createRequestMiddleware: ({prefix}: {prefix: string}) => ApiMiddleware =
  ({prefix}) =>
    ({req}, next) => {
      console.log(`${prefix}${prefix ? " " : ""}[${req.method}] ${req.url}`);
      return next();
    };
