import { useEffect, useRef } from "react";
import clockAnimation from "../../utils/clockAnimation";
import "../../styles/analog-clock.css";

type Props = { tz?: string };

export default function AnalogClock({ tz }: Props) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const requestAnimationFrameHolder = clockAnimation({
      canvas: canvasRef.current,
      timeZone: tz,
    });
    return () => cancelAnimationFrame(requestAnimationFrameHolder.latest);
  }, [tz]);

  return (
    <div className="clock-container-outer">
      <div className="clock-container">
        <canvas ref={canvasRef} width="500" height="500"></canvas>
      </div>
    </div>
  );
}
