import {declension} from "@/core/utils/formatters";

export default function formatHours(hours: number | undefined | null) {
  if (!hours) return "-";
  if (hours % 24 !== 0 || hours < 24) {
    return `${hours} ${declension(hours, ["час", "часа", "часов"])}`;
  }
  const days: number = hours / 24;

  switch (days) {
    case 1:
      return "1 день";
    case 7:
      return "1 неделя";
    case 14:
      return "2 недели";
    case 21:
      return "3 недели";
    case 30:
      return "1 месяц";
    case 60:
      return "2 месяца";
    case 90:
      return "3 месяца";
    case 120:
      return "4 месяца";
    case 150:
      return "5 месяцев";
    case 180:
      return "пол года";
  }

  // Месяца
  if (!(days % 30)) return `${days / 30} ${declension(days / 30, ["месяц", "месяца", "месяцев"])}`;
  if (!(days % 31)) return `${days / 31} ${declension(days / 31, ["месяц", "месяца", "месяцев"])}`;

  return hours + " ч.";
}
