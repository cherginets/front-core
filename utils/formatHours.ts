import {declension} from "@/core/utils/formatters";

export default function formatHours(hours: number | undefined | null) {
  if (!hours) return "-";
  if (hours % 24 !== 0 || hours < 24) {
    return `${hours} ${declension(hours, ["час", "часа", "часов"])}`;
  }
  const days: number = hours / 24;
  const months: number = days / 30;

  if(Number.isInteger(months)) {
    return `${months} ${declension(months, ['месяц', "месяца", "месяцев"])}`
  }
  if(Number.isInteger(days)) {
    return `${days} ${declension(days, ['день', "дня", "дней"])}`
  }

  // Месяца
  if (!(days % 30)) return `${days / 30} ${declension(days / 30, ["месяц", "месяца", "месяцев"])}`;
  if (!(days % 31)) return `${days / 31} ${declension(days / 31, ["месяц", "месяца", "месяцев"])}`;

  return hours + " ч.";
}
