import { useEffect, useRef } from "react";
import clockAnimation from "../../utils/clockAnimation";
import "../../styles/analog-clock.css";

type Props = { tz?: string };

// ###############################################################################
// ADD IF USING SECONDS

// export default function AnalogClock({ tz }: Props) {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const requestAnimationFrameHolder = clockAnimation({
//       canvas: canvasRef.current,
//       timeZone: tz,
//     });
//     return () => cancelAnimationFrame(requestAnimationFrameHolder.latest);
//   }, [tz]);
// ##############################################################################

// ##############################################################################
// REMOVE IF USING SECONDS

export default function AnalogClock({ tz }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let timeoutId: number | undefined;
    let intervalId: number | undefined;

    const draw = () => {
      clockAnimation({
        canvas: canvasRef.current,
        timeZone: tz,
        noLoop: true,
      });
    };

    draw();

    const schedule = () => {
      const now = new Date();
      const msToNextMinute =
        (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
      timeoutId = window.setTimeout(() => {
        draw();
        intervalId = window.setInterval(draw, 60_000);
      }, msToNextMinute);
    };

    schedule();

    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [tz]);
  // #################################################################################

  return (
    <div className="clock-container-outer">
      <div className="clock-container">
        <canvas ref={canvasRef} width="500" height="500"></canvas>
      </div>
    </div>
  );
}
