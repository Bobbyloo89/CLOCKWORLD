import { useMinuteNow } from "../../hooks/useTick";
import { formatDate, formatTime } from "../../utils/time";

type Props = {
  tz: string;
};

export default function DigitalClock({ tz }: Props) {
  const now = useMinuteNow();
  return (
    <>
      <div className="digital-clock-wrapper">
        <h3>{formatTime(now, tz)}</h3>
        <h4>{formatDate(now, tz)}</h4>
      </div>
    </>
  );
}
