import { useState, useEffect } from "react";

export const useCountdown = (seconds: number) => {
  const [count, setCount] = useState(seconds);

  const reset = () => {
    setCount(seconds);
  };

  useEffect(() => {
    if (count === 0) {
      return;
    }
    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [count]);

  return { count, reset, set: setCount };
};
