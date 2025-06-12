import {NextRequest, NextResponse} from "next/server";

export type ApiContext = {
  req: NextRequest;
  res: NextResponse;
  pathname: string;
};

export type ApiNext = () => ((ctx: ApiContext) => any) | (() => any);

export type ApiMiddleware = (ctx: ApiContext, next: (ctx: ApiContext) => any) => ApiNext;