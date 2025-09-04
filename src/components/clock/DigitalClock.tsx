import { useMinuteNow } from "../../hooks/useTick";
import { formatDate, formatTime } from "../../utils/time";

type Props = {
  tz: string;
};

export default function DigitalClock({ tz }: Props) {
  const now = useMinuteNow();
  return (
    <>
      <div>{formatTime(now, tz)}</div>
      <div>{formatDate(now, tz)}</div>
    </>
  );
}