export const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const IS_PROD = process.env.NODE_ENV === "production";
export const IS_DEV = process.env.NODE_ENV === "development";
export const DEBUG_ON = process.env.NEXT_PUBLIC_DEBUG === "on";

export const CHAR_DOT = "•";
export const CHAR_RUBLE = "₽";

export const TIME_SEC = {
  SECOND: 1, // 1 секунда в миллисекундах
  MINUTE: 60, // 1 минута в миллисекундах
  HOUR: 60 * 60, // 1 час в миллисекундах
  DAY: 24 * 60 * 60, // 1 день в миллисекундах
  WEEK: 7 * 24 * 60 * 60, // 1 неделя в миллисекундах
};
export const TIME_MSEC = {
  SECOND: 1000, // 1 секунда в миллисекундах
  MINUTE: 60 * 1000, // 1 минута в миллисекундах
  HOUR: 60 * 60 * 1000, // 1 час в миллисекундах
  DAY: 24 * 60 * 60 * 1000, // 1 день в миллисекундах
  WEEK: 7 * 24 * 60 * 60 * 1000, // 1 неделя в миллисекундах
};
