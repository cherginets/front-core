"use client";
import React, { useEffect, useState } from "react";
import { number_format } from "@/core/utils/php";

interface CounterProps {
  targetValue: number;
  duration: number; // Время анимации в миллисекундах
  formatNumber?: (num: number) => string; // Время анимации в миллисекундах
}

const GraduallyCounter: React.FC<CounterProps> = ({
  targetValue,
  duration,
  formatNumber = (num) => number_format(num, 0, ".", " "),
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = targetValue / (duration / 100); // Количество увеличений за 100 мс
    const timer = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        clearInterval(timer);
        start = targetValue; // Корректируем в случае переполнения
      }
      setCount(Math.round(start)); // Обновляем состояние
    }, 100);

    return () => clearInterval(timer); // Очистка таймера при размонтировании компонента
  }, [targetValue, duration]);

  return <span>{formatNumber(count || targetValue)}</span>;
};

export default GraduallyCounter;
