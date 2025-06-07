export default class HttpError extends Error {
  httpCode: number = 500;
  code: number = 0;

  constructor(message?: string, code: number = 0) {
    super(message || "Что-то пошло не так, обратитесь к администратору.");
    this.code = code;
  }
}
