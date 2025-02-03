import {Schema, ValidationError} from "yup";
import BadRequestError from "@/core/errors/http/BadRequestError";

// Функция для валидации
export default async function validateJson(schema: Schema, json: any) {
  try {
    // Валидация данных
    const validData = await schema.validate(json, {abortEarly: false});
    // console.log('Валидация успешна:', validData);
  } catch (err) {
    // Обработка ошибок валидации
    if (err instanceof ValidationError) {
      console.error("Ошибки валидации:", err.errors);
      throw new BadRequestError(`Ошибки валидации: ${err.errors.join("; ")}`);
    } else {
      throw err;
    }
  }
}
