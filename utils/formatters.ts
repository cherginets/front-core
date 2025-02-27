import {CHAR_RUBLE} from "../constants";
import {number_format} from "./php";

export const MOMENT_FOR_FILENAME = "YYYYMMDDHHmmss";

export const MOMENT_DATE_MYSQL = "YYYY-MM-DD HH:mm:ss";
export const MOMENT_DATE_PRETTY = "YYYY-MM-DD HH:mm";

export const formatMoney = (
  value: any,
  options: {
    show_ruble?: boolean;
  } = {
    show_ruble: true,
  }
) => {
  const show_ruble = !!options.show_ruble;

  if (!value) value = 0;
  let formattedNum = number_format(typeof value === "string" ? parseFloat(value) : value, 2, ".", " ");
  if (formattedNum.endsWith(".00")) formattedNum = formattedNum.slice(0, formattedNum.length - 3);

  return `${formattedNum}${show_ruble ? ` ` + CHAR_RUBLE : ""}`;
};

/**
 * Выдаёт разные склонения слова в зависимости от переданного number
 * 1 клиент
 * 2 клиента
 * 5 клиентов
 * @param number
 * @param words
 */
export const declension = (number: number, words: string[]): string => {
  if (words.length < 3) {
    throw new Error(
      "Должно быть передано 3 формы слова (именительный, родительный и родительный во множественном числе)."
    );
  }

  const nominative = words[0]; // Именительный падеж
  const genitiveSingular = words[1]; // Родительный падеж (ед. число)
  const genitivePlural = words[2]; // Родительный падеж (мн. число)

  const remainder10 = number % 10;
  const remainder100 = number % 100;

  let result: string;

  if (remainder10 === 1 && remainder100 !== 11) {
    result = nominative;
  } else if (remainder10 >= 2 && remainder10 <= 4 && (remainder100 < 12 || remainder100 > 14)) {
    result = genitiveSingular;
  } else {
    result = genitivePlural;
  }

  return result;
};
