import {NextRequest, NextResponse} from "next/server";

export type ApiContext = {
  req: NextRequest;
  pathname: string;
  query: Record<string, string>
  params: Record<string, string>
  ip: string
};

export type ApiMiddleware<Context extends ApiContext = ApiContext> = (ctx: Context, next: (ctx: Context) => any) => any;