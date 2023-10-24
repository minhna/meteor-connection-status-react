import React, { useState, useEffect, useRef } from "react";

interface SecondsCountdownProps {
  seconds: number;
  showText?: boolean;
  secondsText?: string;
  secondText?: string;
  onFinishedCountdown?: () => void;
}
export const SecondsCountdown: React.FC<SecondsCountdownProps> = ({
  seconds: secondsRemaining,
  showText = false,
  secondText = "second",
  secondsText = "seconds",
  onFinishedCountdown,
}) => {
  const [seconds, setSeconds] = useState(secondsRemaining);

  const timerRef = useRef<ReturnType<typeof setInterval>>();
  useEffect(() => {
    if (seconds === 0) {
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
    timerRef.current = setInterval(() => {
      setSeconds(seconds - 1 >= 0 ? seconds - 1 : 0);
    }, 1000);
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [seconds]);

  useEffect(() => {
    if (seconds === 0 && onFinishedCountdown) {
      onFinishedCountdown();
    }
  }, [seconds]);

  let content = `${seconds}`;
  if (showText) {
    content += ` ${seconds > 1 ? secondsText : secondText}`;
  }
  return <span className="seconds-remaining">{content}</span>;
};
