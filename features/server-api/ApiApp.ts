import {ApiRouter} from "@/core/features/server-api/ApiRouter";
import {ApiContext} from "@/core/features/server-api/types";
import {NextResponse} from "next/server";

export class ApiApp extends ApiRouter {
  private routersMap: Record<string, ApiRouter> = {};

  async start(_ctx: Pick<ApiContext, "req" | "res">) {
    const ctx = {
      ..._ctx,
      pathname: _ctx.req.nextUrl.pathname.slice(4),
    };

    for (const [pathPrefix, router] of Object.entries(this.routersMap)) {
      if (ctx.pathname.startsWith(pathPrefix)) {

        const result = await this.applyMiddlewares(ctx, async (newCtx = ctx) => {
          return await router.handler(newCtx, newCtx.pathname.slice(pathPrefix.length) || "/");
        });

        if (result instanceof NextResponse) {
          return result;
        } else if (result !== undefined) {
          return NextResponse.json(result);
        }
      }
    }

    return NextResponse.json({error: "Not Found"}, {status: 404});
  }

  addRouter(pathPrefix: string, router: ApiRouter) {
    if (pathPrefix in this.routersMap) {
      throw new Error("Router with this path prefix already exists: " + pathPrefix);
    }
    this.routersMap[pathPrefix] = router;
  }
}
