import {useEffect, useState} from 'react';
const useCountdown = ({initialSeconds}: {initialSeconds: number}) => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const startTimer = () => {
    setSeconds(initialSeconds);
    setIsRunning(true);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setSeconds(initialSeconds);
  };

  return {seconds, startTimer, resetTimer, isRunning};
};

export default useCountdown;
