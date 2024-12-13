import HttpError from "@/services/errors/HttpError";

export default class ForbiddenError extends HttpError {
  httpCode = 403;
  message = "Доступ запрещён.";
}
