import {HTTP_METHOD} from "next/dist/server/web/http";
import {NextResponse} from "next/server";
import {ApiContext, ApiMiddleware } from "./types";

export class ApiRouter {
  public middlewares: ApiMiddleware[] = [];
  // Ключ - URL, значение - обработчик
  public methodsMap: Partial<Record<HTTP_METHOD, Record<string, (ctx: ApiContext) => any>>> = {};

  use(middleware: ApiMiddleware) {
    this.middlewares.push(middleware);
  }

  // region HTTP methods
  get(url: string, handler: (ctx: ApiContext) => any) {
    if (!this.methodsMap.GET) {
      this.methodsMap.GET = {};
    }
    if (url in this.methodsMap.GET) {
      throw new Error("Handler for this URL already exists: " + url);
    }
    this.methodsMap.GET[url] = handler;
  }

  post(url: string, handler: (ctx: ApiContext) => any) {
    if (!this.methodsMap.POST) {
      this.methodsMap.POST = {};
    }
    if (url in this.methodsMap.POST) {
      throw new Error("Handler for this URL already exists: " + url);
    }
    this.methodsMap.POST[url] = handler;
  }

  patch(url: string, handler: (ctx: ApiContext) => any) {
    if (!this.methodsMap.PATCH) {
      this.methodsMap.PATCH = {};
    }
    if (url in this.methodsMap.PATCH) {
      throw new Error("Handler for this URL already exists: " + url);
    }
    this.methodsMap.PATCH[url] = handler;
  }

  put(url: string, handler: (ctx: ApiContext) => any) {
    if (!this.methodsMap.PUT) {
      this.methodsMap.PUT = {};
    }
    if (url in this.methodsMap.PUT) {
      throw new Error("Handler for this URL already exists: " + url);
    }
    this.methodsMap.PUT[url] = handler;
  }

  delete(url: string, handler: (ctx: ApiContext) => any) {
    if (!this.methodsMap.DELETE) {
      this.methodsMap.DELETE = {};
    }
    if (url in this.methodsMap.DELETE) {
      throw new Error("Handler for this URL already exists: " + url);
    }
    this.methodsMap.DELETE[url] = handler;
  }

  // endregion

  async handler(ctx: ApiContext, url: string) {
    const method = ctx.req.method! as HTTP_METHOD;

    // Проверяем, есть ли обработчик для данного метода и URL
    if (this.methodsMap[method] && this.methodsMap[method][url]) {
      // Если есть, вызываем middlewares и обработчик
      // @ts-expect-error todo
      return await this.applyMiddlewares(ctx, async (ctx) => await (this.methodsMap[method][url](ctx)), this.middlewares);
    }

    console.log("this.methodsMap", this.methodsMap);

    // Если обработчика нет, возвращаем 404
    return NextResponse.json({error: "Not Found"}, {status: 404});
  }

  async applyMiddlewares(ctx: ApiContext, next: (ctx?: ApiContext) => Promise<any>, middlewares = this.middlewares):Promise<any> {
    console.log('middlewares.length', middlewares.length);
    // Если нет middlewares, просто вызываем next
    if(!middlewares.length) {
      return next(ctx);
    }
    // Берем первый middleware и вызываем его
    const [currentMiddleware, ...restMiddlewares] = middlewares;

    return currentMiddleware(ctx, async (nextCtx = ctx) => {
      return await this.applyMiddlewares(nextCtx, next, restMiddlewares);
    });

  }
}