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
import api from "./api";
import {NextRequest, NextResponse} from "next/server";

const handler = async (req: NextRequest, res: NextResponse) => {
  return await api.start({req, res});
};
export const GET = async (req: NextRequest, res: NextResponse) => await handler(req, res);
export const POST = async (req: NextRequest, res: NextResponse) => await handler(req, res);
export const PATCH = async (req: NextRequest, res: NextResponse) => await handler(req, res);
export const PUT = async (req: NextRequest, res: NextResponse) => await handler(req, res);
export const DELETE = async (req: NextRequest, res: NextResponse) => await handler(req, res);

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

