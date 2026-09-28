"use client";

import { useEffect, useState } from "react";

type CountdownParts = { days: number; hours: number; minutes: number; seconds: number };

const pad = (n: number) => String(n).padStart(2, "0");

export function useCountdown(days: number, hours: number, minutes: number, seconds: number) {
  const [remaining, setRemaining] = useState<CountdownParts>({ days, hours, minutes, seconds });

  useEffect(() => {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + days);
    deadline.setHours(deadline.getHours() + hours);
    deadline.setMinutes(deadline.getMinutes() + minutes);
    deadline.setSeconds(deadline.getSeconds() + seconds);

    const tick = () => {
      const diff = Math.max(0, deadline.getTime() - Date.now());
      setRemaining({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
      if (diff <= 0) clearInterval(timer);
    };

    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [days, hours, minutes, seconds]);

  return {
    days: pad(remaining.days),
    hours: pad(remaining.hours),
    minutes: pad(remaining.minutes),
    seconds: pad(remaining.seconds),
  };
}
