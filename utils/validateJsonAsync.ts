import BadRequestError from "@/core/errors/http/BadRequestError";
import {Schema, ValidationError} from "yup";

export function validateJson(schema: Schema, json: any) {
  try {
    // Валидация данных
    const validData = schema.validateSync(json, {abortEarly: false});
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


// Функция для валидации
export default async function validateJsonAsync(schema: Schema, json: any) {
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
