import {NextRequest, NextResponse} from "next/server";

export type ApiContext = {
  req: NextRequest;
  res: NextResponse;
  pathname: string;
  query: Record<string, string>
  params: Record<string, string>
};

export type ApiMiddleware = (ctx: ApiContext, next: (ctx: ApiContext) => any) => any;