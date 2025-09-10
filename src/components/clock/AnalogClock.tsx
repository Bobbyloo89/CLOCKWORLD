import { useEffect, useRef } from "react";
import clockAnimation from "../../utils/clockAnimation";
import "../../styles/analog-clock.css";

// Canvas-based analog clock. Rendered with the given timezone or system time if
// timezone is not provided
// SEE COMMENTS IF YOU WANT TO USE DIAL FOR SECONDS
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

// Renders once immediately, calculates time until next minute and updates or "tick",
// then updates or "tick" every 60 seconds.
// Built like this for lower CPU-usage and because I felt showing seconds was unnecessary
export default function AnalogClock({ tz }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let timeoutId: number | undefined;
    let intervalId: number | undefined;

    // Draw a single frame
    const draw = () => {
      clockAnimation({
        canvas: canvasRef.current,
        timeZone: tz,
        noLoop: true, // hint to only render one frame (implementation in clockAnimation)
      });
    };

    // Draw immediately for initial paint
    draw();

    // Schedule update for the next minute-switch
    const schedule = () => {
      const now = new Date();
      const msToNextMinute =
        (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
      timeoutId = window.setTimeout(() => {
        // Snap to the next minute and start a steady 60s interval
        draw();
        intervalId = window.setInterval(draw, 60_000);
      }, msToNextMinute);
    };

    schedule();

    // Clear pending timers when unmounting or when tz changes
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [tz]);
  // #################################################################################

  return (
    <div className="clock-container-outer">
      <div className="clock-container">
        {/* Canvas size 500x500, cropped/scaled via CSS */}
        <canvas ref={canvasRef} width="500" height="500"></canvas>
      </div>
    </div>
  );
}
