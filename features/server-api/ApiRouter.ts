import {HTTP_METHOD} from "next/dist/server/web/http";
import {NextRequest, NextResponse} from "next/server";
import {ApiContext, ApiMiddleware } from "./types";

export class ApiRouter {
  public prefix = "";
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
    const pathname = ctx.pathname;

    for(const [routePath, handler] of Object.entries(this.methodsMap[method] || {})) {

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

      return await this.applyMiddlewares(ctx, async (ctx) => {
        return await handler(ctx);
      }, this.middlewares);

    }


    // Если обработчика нет, возвращаем 404
    return NextResponse.json({error: "Not Found"}, {status: 404});
  }

  async applyMiddlewares(ctx: ApiContext, next: (ctx: ApiContext) => Promise<any>, middlewares = this.middlewares):Promise<any> {
    console.log('middlewares.length', middlewares.length, ctx.params);
    // Если нет middlewares, просто вызываем next
    if(!middlewares.length) {
      console.log('run next')
      return await next(ctx);
    }
    // Берем первый middleware и вызываем его
    const [currentMiddleware, ...restMiddlewares] = middlewares;

    return currentMiddleware(ctx, async (ctx) => {
      return await this.applyMiddlewares(ctx, next, restMiddlewares);
    });

  }

  private parseSlugParams(req: NextRequest, routeUrl: string) {
    const paramsArray: string[] = [];

    const routeRegex = new RegExp(
      "^" +
      routeUrl
        .replace(/{([^/{}]+)}/g, (_, paramName) => {
          paramsArray.push(paramName); // Сохраняем имена параметров
          return "([^/]+)"; // Заменяем на группу
        })
        .replace(/\//g, "\\/") + // Экранируем слэши
      "$"
    );

    const match = this.getPathname(req).match(routeRegex);
    if (!match) {
      return {};
    }

    // Извлекаем параметры
    return paramsArray.reduce<Record<string, string>>((acc, paramName, index) => {
      acc[paramName] = match[index + 1];
      return acc;
    }, {});
  }

  protected getPathname(req: NextRequest): string {
    return req.nextUrl.pathname.slice(4)
  }
}