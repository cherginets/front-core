import {ApiRouter} from "@/core/server/ApiRouter";
import {ApiContext} from "@/core/server/types";
import {NextResponse} from "next/server";

export class ApiApp extends ApiRouter {
  private routersMap: Record<string, ApiRouter> = {};

  async start(_ctx: Pick<ApiContext, "req" | "res">) {
    const ctx = {
      ..._ctx,
      pathname: _ctx.req.nextUrl.pathname.slice(4),
    };

    const result = await this.applyMiddlewares(ctx, async (newCtx = ctx) => {
      return NextResponse.json(newCtx.pathname);
      // return await router.handler(ctx, ctx.pathname.slice(pathPrefix.length) || "/");
    });

    return result;

    if (result instanceof NextResponse) {
      return result;
    } else if (result !== undefined) {
      return NextResponse.json(result);
    }



    for (const [pathPrefix, router] of Object.entries(this.routersMap)) {
      if (ctx.pathname.startsWith(pathPrefix)) {


        const result = await this.applyMiddlewares(ctx, async (ctx) => {
          return 2;
          // return await router.handler(ctx, ctx.pathname.slice(pathPrefix.length) || "/");
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
