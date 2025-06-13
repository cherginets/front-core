import {ApiRouter} from "@/core/features/server-api/ApiRouter";
import {NextRequest, NextResponse} from "next/server";

export class ApiApp extends ApiRouter {
  private routersMap: Record<string, ApiRouter> = {};

  async start(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    const ctx = {
      req,
      res,
      pathname: this.getPathname(req),
      query: Object.fromEntries(req.nextUrl.searchParams),
      params: {},
    };

    const result = await this.applyMiddlewares(ctx, async (ctx) => {
      for (const [pathPrefix, router] of Object.entries(this.routersMap)) {
        if (ctx.pathname.startsWith(pathPrefix)) {

          return await router.handler(ctx, ctx.pathname.slice(pathPrefix.length) || "/");

          if (result instanceof NextResponse) {
            return result;
          } else if (result !== undefined) {
            return NextResponse.json(result);
          }
        }
      }

      return NextResponse.json({error: "Not Found"}, {status: 404});
    });

    return result;
  }

  addRouter(pathPrefix: string, router: ApiRouter) {
    if (pathPrefix in this.routersMap) {
      throw new Error("Router with this path prefix already exists: " + pathPrefix);
    }
    router.prefix = pathPrefix
    this.routersMap[pathPrefix] = router;
  }
}
