import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  let timer = useRef();
  let dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  let TimerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    dialog.current.open();
  }

  const formattedRemainingTime = timeRemaining / 1000;

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }

  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open();
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        result="lost"
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {formattedRemainingTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button onClick={TimerIsActive ? handleStop : handleStart}>
            {TimerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={TimerIsActive ? "active" : undefined}>
          {TimerIsActive ? "Time is Running..." : "Timer inactive"}
        </p>
      </section>
    </>
  );
}
