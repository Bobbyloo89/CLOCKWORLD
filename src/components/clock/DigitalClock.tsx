import { useMinuteNow } from "../../hooks/useTick";
import { formatDate, formatTime } from "../../utils/time";

// Displays local time in 24hr-format and local date in en-GB-format for a given IANA-timezone
// Clock updates every minute (no seconds)

type Props = {
  tz: string; // IANA-timezone-format (ex. "Europe/Stockholm")
};

export default function DigitalClock({ tz }: Props) {
  // Shared Date that updates every minute (see src/hooks/useTick.ts)
  const now = useMinuteNow();
  return (
    <>
      <div className="digital-clock-wrapper">
        <h3>{formatTime(now, tz)}</h3>
        <p>{formatDate(now, tz)}</p>
      </div>
    </>
  );
}
