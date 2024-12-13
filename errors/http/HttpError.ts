export default class HttpError extends Error {
  httpCode: number;

  constructor(message?: string, code?: number) {
    super(message || "Что-то пошло не так, обратитесь к администратору.");
    this.httpCode = code || 500;
  }
}
