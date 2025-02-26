import {APP_HOST} from "@/core/constants";
import {NextRequest, NextResponse} from "next/server";

export type Redirects = {
  [key: string]: {
    destination: string;
    permanent: boolean;
  };
};
export const redirectsMiddleware = (
  req: NextRequest,
  {
    data,
  }: {
    data: Redirects;
  },
  callback: (req: NextRequest) => any
) => {
  if (req.nextUrl.pathname in data) {
    return NextResponse.redirect(APP_HOST + data[req.nextUrl.pathname].destination, 301);
  }

  return callback(req);
};
