# Server-api

### Назначение 

Служит для кастомного, более удобного expressjs-like роутинга апи в приложении NextJS.

### Подключение

Для подключения необходимо создать в желаемом месте следующую структуру папок:

```

<nextjs root>/app/
  api/ # или другая папка
    [...slug]/
      route.ts
```


```typescript
// route.ts
import api from "./api.ts"
const handler = async (req: NextRequest, res: NextResponse) => {
  return await api.start({req, res});
}
export const GET = async (req: NextRequest) => await handler(req);
export const POST = async (req: NextRequest) => await handler(req);
export const PATCH = async (req: NextRequest) => await handler(req);
export const PUT = async (req: NextRequest) => await handler(req);
export const DELETE = async (req: NextRequest) => await handler(req);
```

```typescript
// api.ts
const api = new ApiApp();

// Вешаем глобальные middlewares
api.use(createRequestMiddleware({prefix: "MAIN_LOGGER"}));

api.addRouter("/test", testRouter);
api.addRouter("/cron", cronRouter);

export default api;
```

## Правила

