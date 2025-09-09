import { useEffect, useState } from "react";

// Date-object that is updated every minute
// Lets components share a single "now" without having to read system time individually

export function useMinuteNow(): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    // ms until next "minute-shift"
    const n = new Date();
    const msIntoMinute = n.getSeconds() * 1000 + n.getMilliseconds();
    let msToNextMinute = 60_000 - msIntoMinute;
    if (msToNextMinute === 60_000) msToNextMinute = 0;

    let intervalId: number | undefined;

    const timeoutId = window.setTimeout(() => {
      // Snap to new minute and start new timer
      setNow(new Date());
      intervalId = window.setInterval(() => setNow(new Date()), 60_000);
    }, msToNextMinute);

    // Clear pending timeout and live interval
    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, []);

  return now;
}
