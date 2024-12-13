import HttpError from "@/core/errors/http/HttpError";

export default class ForbiddenError extends HttpError {
  httpCode = 403;
  message = "Доступ запрещён.";
}
