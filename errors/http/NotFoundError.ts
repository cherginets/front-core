import HttpError from "@/core/errors/http/HttpError";

export default class NotFoundError extends HttpError {
  httpCode = 404;

  constructor(message?: string) {
    super(message || "Элемент не найден");
  }
}
