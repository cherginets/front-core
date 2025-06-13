import {NextRequest} from "next/server";

export const getUserIpFromNextRequest = async (req: NextRequest) => {
  const headers = await req.headers;
  return (headers.get("x-real-ip") || headers.get("x-forwarded-for") || "unknown") as string;
};