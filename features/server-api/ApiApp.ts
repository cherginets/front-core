import {CoreApiRouter} from "@/core/features/server-api/CoreApiRouter";
import {NextRequest, NextResponse} from "next/server";
import {ApiContext} from "@/core/features/server-api/types";
import {getUserIpFromNextRequest} from "@/core/utils/getUserIpFromNextRequest";

export class ApiApp<Context extends ApiContext> extends CoreApiRouter<Context> {
  private routersMap: Record<string, CoreApiRouter<Context>> = {};

  async start(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    const ctx = {
      req,
      res,
      pathname: this.getPathname(req),
      query: Object.fromEntries(req.nextUrl.searchParams),
      params: {},
      ip: await getUserIpFromNextRequest(req),
    };

    return await this.applyMiddlewares(ctx as Context, async (ctx) => {
      for (const [pathPrefix, router] of Object.entries(this.routersMap)) {
        if (ctx.pathname.startsWith(pathPrefix)) {

          const result = await router.handler(ctx, ctx.pathname.slice(pathPrefix.length) || "/");

          if (result instanceof NextResponse) {
            return result;
          } else if (result !== undefined) {
            return NextResponse.json(result);
          }
        }
      }

      return NextResponse.json({error: "Not Found"}, {status: 404});
    });
  }

  addRouter(pathPrefix: string, router: CoreApiRouter<Context>) {
    if (pathPrefix in this.routersMap) {
      throw new Error("Router with this path prefix already exists: " + pathPrefix);
    }
    router.prefix = pathPrefix
    this.routersMap[pathPrefix] = router;
    return router;
  }
}
