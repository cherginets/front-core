export const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export const IS_PROD = process.env.NODE_ENV === "production";
export const IS_DEV = process.env.NODE_ENV === "development";
export const DEBUG_ON = process.env.NEXT_PUBLIC_DEBUG === "on";

export const APP_HOST = process.env.APP_HOST as string || process.env.NEXT_PUBLIC_APP_HOST as string;

export const CHAR_DOT = "•";
export const CHAR_RUBLE = "₽";
export const CHAR_LAQUO = "«";
export const CHAR_RAQUO = "»";

export const lrquo = (str: string): string => `${CHAR_LAQUO}${str}${CHAR_RAQUO}`;

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

export const CHART_COLOR_1_MAIN = 'rgba(54, 162, 235)';
export const CHART_COLOR_1_BG = 'rgba(54, 162, 235, 0.2)';
export const CHART_COLOR_BUY_MAIN = 'rgba(255, 99, 132)';
export const CHART_COLOR_BUY_BG = 'rgba(255, 99, 132, 0.2)';
export const CHART_COLOR_PROLONG_MAIN = 'rgba(54, 162, 235, 1)';
// export const CHART_COLOR_PROLONG_MAIN = 'rgba(255, 206, 86)';
export const CHART_COLOR_PROLONG_BG = 'rgba(255, 206, 86, 0.2)';
export const CHART_COLOR_PURCHASE_MAIN = 'rgba(75, 192, 192)';
export const CHART_COLOR_PURCHASE_BG = 'rgba(75, 192, 192, 0.2)';
export const CHART_COLOR_MARGE_MAIN = 'rgba(153, 102, 255)';
export const CHART_COLOR_MARGE_BG = 'rgba(153, 102, 255, 0.2)';
export const CHART_COLOR_6_MAIN = 'rgba(255, 159, 64)';
export const CHART_COLOR_6_BG = 'rgba(255, 159, 64, 0.2)';