import {useEffect, useMemo, useState} from "react";
import {Moment, MomentInput} from "moment";
import moment from "moment/moment";
import {declension} from "@/core/utils";

export function useTimer() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
}

export function useTimerUntil(value: MomentInput) {
  const time = useTimer();

  const timerExpiredAt = useMemo(() => moment(value), [value]);

  return useMemo(() => {
    if (!timerExpiredAt) return {expired: true};
    if (timerExpiredAt < moment()) return {expired: true};

    let timerLabel = "";

    const secondsLeft = Math.abs(moment().diff(timerExpiredAt, 'seconds'));
    const days = Math.round(secondsLeft / (60 * 60 * 24));
    const hours = Math.floor(secondsLeft / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;
    if (secondsLeft > 60 * 60 * 24) {
      timerLabel = `${days} ${declension(days, ['день', "дня", "дней"])}`
    } else {
      timerLabel = `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
    }

    return {timerLabel, secondsLeft, hours, minutes, seconds, expired: false}

  }, [timerExpiredAt, time])
}