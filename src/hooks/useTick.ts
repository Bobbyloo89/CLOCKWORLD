import { useEffect, useState } from "react";

// date-object that is updated every minute

export function useMinuteNow(): Date {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    // ms until next minute
    const n = new Date();
    const msToNextMinute = (60 - n.getSeconds()) * 1000 - n.getMilliseconds();

    const timeout = setTimeout(() => {
      setNow(new Date());
      const interval = setInterval(() => setNow(new Date()), 60_000);
      // clear interval when hook is unmounted
      return () => clearInterval(interval);
    }, msToNextMinute);

    return () => clearTimeout(timeout);
  }, []);

  return now;
}