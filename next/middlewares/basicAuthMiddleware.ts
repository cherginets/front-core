import {NextRequest} from "next/server";

// Пользовательские данные для Basic Auth
const BASIC_AUTH_USER = process.env.BASIC_AUTH_USER || "admin";
const BASIC_AUTH_PASSWORD = process.env.BASIC_AUTH_PASSWORD || "password";

export const basicAuthMiddleware = (req: NextRequest, options: {
  excludedPathsStartsWith?: string[]
}, callback: (req: NextRequest) => any) => {
  if (
    process.env.BASIC_AUTH === "on" &&
    !((options.excludedPathsStartsWith || []).find(path => req.nextUrl.pathname.startsWith(path)))
  ) {
    // Проверяем заголовок авторизации
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return new Response("Authentication required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Secure Area"',
        },
      });
    }

    // Декодируем и проверяем логин/пароль
    const [username, password] = atob(authHeader.split(" ")[1]).split(":");
    if (username !== BASIC_AUTH_USER || password !== BASIC_AUTH_PASSWORD) {
      return new Response("Unauthorized", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Secure Area"',
        },
      });
    }
  }

  return callback(req);
}