import { useState, useEffect, useRef, useCallback } from "react";

interface UseTimerOptions {
  duration: number;
  onExpire: () => void;
  isPaused?: boolean;
}

export function useTimer({
  duration,
  onExpire,
  isPaused: initialPaused = false,
}: UseTimerOptions) {
  const [isPaused, setIsPaused] = useState(initialPaused);
  const remainingTime = useRef<number>(duration);
  const startTime = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [progress, setProgress] = useState<number>(100);
  const animFrameRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  }, []);

  const updateProgress = useCallback(() => {
    if (startTime.current !== null && !isPaused) {
      const elapsed = Date.now() - startTime.current;
      const currentRemaining = Math.max(0, remainingTime.current - elapsed);
      const calculatedProgress = (currentRemaining / duration) * 100;
      setProgress(calculatedProgress);

      if (currentRemaining > 0) {
        animFrameRef.current = requestAnimationFrame(updateProgress);
      }
    }
  }, [duration, isPaused]);

  const start = useCallback(() => {
    clearTimer();
    startTime.current = Date.now();
    timerRef.current = setTimeout(onExpire, remainingTime.current);
    animFrameRef.current = requestAnimationFrame(updateProgress);
  }, [clearTimer, onExpire, updateProgress]);

  const pause = useCallback(() => {
    if (timerRef.current && startTime.current !== null) {
      clearTimer();
      const elapsed = Date.now() - startTime.current;
      remainingTime.current = Math.max(0, remainingTime.current - elapsed);
      startTime.current = null;
      setIsPaused(true);
    }
  }, [clearTimer]);

  const resume = useCallback(() => {
    if (startTime.current === null && remainingTime.current > 0) {
      setIsPaused(false);
      start();
    }
  }, [start]);

  useEffect(() => {
    if (!initialPaused) {
      start();
    }
    return clearTimer;
  }, [start, clearTimer, initialPaused]);

  return {
    isPaused,
    pause,
    resume,
    progress,
  };
}
