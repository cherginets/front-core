import {HistoryLevel} from "@/core/features/element_history/ElementHistory.types";

export const formatElementHistoryLevelAsJSX = (level: HistoryLevel) => {
  let label: string = level;
  let className: string = "";
  switch (level) {
    case "debug":
      label = "Отладка"
      className = 'text-gray-500 font-light';
      break;
    case "info":
      label = "Информация"
      break;
    case "warning":
      label = "Предупреждение"
      className = 'text-orange-500 font-bold';
      break;
    case "error":
      label = "Ошибка"
      className = 'text-red-500 font-bold';
      break;
  }
  return <span className={className}>{label}</span>
}