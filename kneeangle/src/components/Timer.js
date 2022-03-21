import { useEffect, useState } from "react";

const useCountdown = () => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter + 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return getReturnValues(counter);
};

const getReturnValues = (counter) => {
  return counter;
};

export { useCountdown };
