import styles from "./counter.module.scss";
import React, { useState, useEffect, useRef } from "react";
import { usePrevious } from "../../utils/use-previous";
import { Pause, PlayArrow, Replay } from "@material-ui/icons";
import { setInterval } from "timers";
import { CounterType } from "../../types/types/components/timer/counter";
import { numberToMinuteSecond } from "../../utils/numberToMinuteSecond";

// TODO: Make counter works when unmount
/**
 * This is a counter that can be played/paused/resumed/reset.
 *
 * @param second is the remaining second of the timer
 * @param setSecond set the time of the timer
 * @returns a Counter component
 */
const Counter = ({ second, setSecond }: CounterType) => {
  const prevSecond = usePrevious(second);
  const [isInputting, setIsInputting] = useState<boolean>(false);
  const [countingSecond, setCountingSecond] = useState<number>(second);
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const [timer, setTimer] = useState<number | null>(null);

  const countingSecondRef = useRef<number>(second);
  const isCountingRef = useRef<boolean>(isCounting);
  const timerRef = useRef<number | null>(timer);

  // Set counting second when props change
  useEffect(() => {
    if (prevSecond !== second) {
      setCountingSecond(second);
      // Change the ref when the state change
      countingSecondRef.current = second;
    }
  }, [second]);

  // Change the ref when the state change
  useEffect(() => {
    isCountingRef.current = isCounting;
  }, [isCounting]);

  // Change the ref when the state change
  useEffect(() => {
    console.log("timer", timer);
    timerRef.current = timer;
  }, [timer]);

  // Clear timer when unmount
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current ?? undefined);
    };
  }, []);

  /**
   * This function set the timer when "Enter" is pressed.
   * 
   * @param e is keyboard input
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsInputting(false);
      if (e.currentTarget.value) {
        setSecond(Math.min(parseInt(e.currentTarget.value), 999) * 60);
      }
    }
  };

  /**
   * This function stops the event propagation.
   * 
   * @param e is mouse event
   */
  const handleParentPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleBackgroundClick = () => {
    if (isInputting) {
      setIsInputting(false);
    }
  };

  /**
   * This function handles the start/stop/resume of the timer
   */
  const handlePlayPause = () => {
    setIsCounting(!isCounting);
    if (!timerRef.current) {
      // Create new countdown timer if there is no timer
      const newTimer = window.setInterval(() => {
        // Check if it is counting
        if (isCountingRef.current) {
          // Stop Timer if timer goes to zero
          if (countingSecondRef.current <= 0) {
            //TODO: sound?
            if (timerRef.current) {
              clearInterval(timerRef.current);
              setTimer(null);
              setIsCounting(false);
            }
            return;
          }
          // Count down
          setCountingSecond(--countingSecondRef.current);
        }
      }, 1000);
      setTimer(newTimer);
    }
  };

  /**
   * This function handles the reset of the timer
   */
  const handleReset = () => {
    // Clear the timer if a timer exists
    if (timerRef.current) {
      clearInterval(timerRef.current);
      setTimer(null);
    }
    // Reset timer
    setCountingSecond(second);
    countingSecondRef.current = second;
    setIsCounting(false);
  };

  /**
   * This function switches the display.
   * 
   * @param isInputting is a inputting flag
   * @returns an input/time-display component
   */
  const getTimerOrInput = (isInputting: boolean) => {
    return isInputting ? (
      <div className={styles.main_display} onClick={handleParentPropagation}>
        <input
          type="number"
          name="timerInput"
          id="timerInput"
          onKeyPress={handleKeyPress}
          className={styles.input}
          onFocus={(e) => {
            e.currentTarget.select();
          }}
          autoFocus
        />
      </div>
    ) : (
      <div className={styles.main_display} onClick={() => setIsInputting(true)}>
        {numberToMinuteSecond(countingSecond)}
      </div>
    );
  };

  return (
    <div className={styles.container} onClick={handleBackgroundClick}>
      {getTimerOrInput(isInputting)}
      <div className={styles.button_container}>
        <button onClick={() => handlePlayPause()}>
          {isCounting ? <Pause className={styles.button} /> : <PlayArrow className={styles.button} />}
        </button>
        <button onClick={() => handleReset()}>
          <Replay className={styles.button} />
        </button>
      </div>
    </div>
  );
};

export default Counter;
