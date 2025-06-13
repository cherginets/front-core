import {HTTP_METHOD} from "next/dist/server/web/http";
import {NextRequest, NextResponse} from "next/server";
import {ApiContext, ApiMiddleware} from "./types";
import NotFoundError from "@/core/errors/http/NotFoundError";

export class CoreApiRouter<Context extends ApiContext> {
  public prefix = "";
  public middlewares: ApiMiddleware<Context>[] = [];
  // Ключ - URL, значение - обработчик
  public methodsMap: Partial<Record<HTTP_METHOD, Record<string, (ctx: Context) => any>>> = {};

  use(...middlewares: ApiMiddleware<Context>[]) {
    this.middlewares.push(...middlewares);
  }

  // region HTTP methods

  private method(method: HTTP_METHOD, url: string, middlewaresOrHandler: any, maybeHandler?: any):CoreApiRouter<Context> {
    const middlewares: ApiMiddleware<Context>[] = Array.isArray(middlewaresOrHandler) ? middlewaresOrHandler : [];
    const handler: (ctx: Context) => any = Array.isArray(middlewaresOrHandler) ? maybeHandler : middlewaresOrHandler;

    if (!this.methodsMap[method]) {
      this.methodsMap[method] = {};
    }
    if (url in this.methodsMap[method]) {
      throw new Error("Handler for this URL already exists: " + url);
    }

    this.methodsMap[method][url] = async (ctx: Context) => {
      return await this.applyMiddlewares(ctx, handler, middlewares);
    };

    return this;
  }

  get(url: string, handler: (ctx: Context) => any): CoreApiRouter<Context>;
  get(url: string, middlewares: ApiMiddleware<Context>[], handler: (ctx: Context) => any): CoreApiRouter<Context>;
  get(url: string, middlewaresOrHandler: any, maybeHandler?: any): CoreApiRouter<Context> {
    return this.method("GET", url, middlewaresOrHandler, maybeHandler);
  }

  post(url: string, handler: (ctx: Context) => any): CoreApiRouter<Context>;
  post(url: string, middlewares: ApiMiddleware<Context>[], handler: (ctx: Context) => any): CoreApiRouter<Context>;
  post(url: string, middlewaresOrHandler: any, maybeHandler?: any): CoreApiRouter<Context> {
   return this.method("POST", url, middlewaresOrHandler, maybeHandler);
  }

  put(url: string, handler: (ctx: Context) => any): CoreApiRouter<Context>;
  put(url: string, middlewares: ApiMiddleware<Context>[], handler: (ctx: Context) => any): CoreApiRouter<Context>;
  put(url: string, middlewaresOrHandler: any, maybeHandler?: any): CoreApiRouter<Context> {
    return this.method("PUT", url, middlewaresOrHandler, maybeHandler);
  }

  delete(url: string, handler: (ctx: Context) => any): CoreApiRouter<Context>;
  delete(url: string, middlewares: ApiMiddleware<Context>[], handler: (ctx: Context) => any): CoreApiRouter<Context>;
  delete(url: string, middlewaresOrHandler: any, maybeHandler?: any): CoreApiRouter<Context> {
    return this.method("DELETE", url, middlewaresOrHandler, maybeHandler);
  }

  patch(url: string, handler: (ctx: Context) => any): CoreApiRouter<Context>;
  patch(url: string, middlewares: ApiMiddleware<Context>[], handler: (ctx: Context) => any): CoreApiRouter<Context>;
  patch(url: string, middlewaresOrHandler: any, maybeHandler?: any): CoreApiRouter<Context> {
    return this.method("PATCH", url, middlewaresOrHandler, maybeHandler);
  }
  // endregion

  async handler(ctx: Context, url: string) {
    const method = ctx.req.method! as HTTP_METHOD;
    const pathname = ctx.pathname;

    let routerHandler: any = null;
    for(const [routePath, localHandler] of Object.entries(this.methodsMap[method] || {})) {

      const routeUrl = this.prefix + routePath;
      const paramsArray: string[] = [];

      const routeRegexString =         "^" +
        routeUrl
          .replace(/{([^/{}]+)}/g, (_, paramName) => {
            paramsArray.push(paramName); // Сохраняем имена параметров
            return "([^/]+)"; // Заменяем на группу
          })
          .replace(/\//g, "\\/") + // Экранируем слэши
        "$"


      const routeRegex = new RegExp(routeRegexString);

      const match = pathname.match(routeRegex);

      if(!match) continue;

      ctx.params = paramsArray.reduce<Record<string, string>>((acc, paramName, index) => {
        acc[paramName] = match[index + 1];
        return acc;
      }, {});

      routerHandler = async () => await this.applyMiddlewares(ctx, async (ctx) => {
        return await localHandler(ctx);
      }, this.middlewares);
      break;
    }

    if(routerHandler) {
      return await routerHandler();
    }

    throw new NotFoundError("Not found");
  }

  async applyMiddlewares(ctx: Context, next: (ctx: Context) => Promise<any>, middlewares = this.middlewares):Promise<any> {
    // Если нет middlewares, просто вызываем next
    if(!middlewares.length) {
      return await next(ctx);
    }
    // Берем первый middleware и вызываем его
    const [currentMiddleware, ...restMiddlewares] = middlewares;

    return currentMiddleware(ctx, async (ctx) => {
      return await this.applyMiddlewares(ctx, next, restMiddlewares);
    });

  }

  protected getPathname(req: NextRequest): string {
    return req.nextUrl.pathname.slice(4)
  }
}