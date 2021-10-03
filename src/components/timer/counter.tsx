import styles from './counter.module.scss';
import React, { useState, useEffect, useRef } from 'react';
import { usePrevious } from '../../utils/use-previous';
import { Pause, PlayArrow, Replay } from '@material-ui/icons';
import { setInterval } from 'timers';

type CounterType = {
  second: number,
  setSecond: Function
}

const Counter = ({second, setSecond}: CounterType) => {
  const prevSecond = usePrevious(second);
  const [isInputting, setIsInputting] = useState<boolean>(false);
  const [countingSecond, setCountingSecond] = useState<number>(second);
  const [isCounting, setIsCounting] = useState<boolean>(false);
  const [timer, setTimer] = useState<number | null>(null);

  const countingSecondRef = useRef<number>(second);
  const isCountingRef = useRef<boolean>(isCounting);
  const timerRef = useRef<number | null>(timer);

  useEffect(() => {
    if (prevSecond !== second) {
      setCountingSecond(second);
      countingSecondRef.current = second;
    }
  }, [second]);

  useEffect(() => {
    isCountingRef.current = isCounting;
  }, [isCounting])

  useEffect(() => {
    console.log('timer', timer)
    timerRef.current = timer;
  }, [timer])


  const numberToMinuteSecond = (second: number) => {
    const min: number = Math.floor(second / 60);
    const sec: number = second % 60;
    const minString: string = min < 10 ? `0${min}`: `${min}`
    const secString: string = sec < 10 ? `0${sec}`: `${sec}`
    return `${minString}:${secString}`;
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsInputting(false);
      if (e.currentTarget.value) {
        setSecond(Math.min(parseInt(e.currentTarget.value), 999) * 60);
      }
    }
  } 

  const handleParentPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  }

  const handleBackgroundClick = () => {
    if (isInputting) {
      setIsInputting(false);
    }
  }

  const handlePlayPause = () => {
    setIsCounting(!isCounting);
    if (!timerRef.current) {
      clearInterval(timerRef.current ?? undefined);
      const newTimer = window.setInterval(() => {
        console.log('running', isCountingRef.current);
        console.log('end', timerRef.current);
        if (isCountingRef.current) {
          console.log('counting', countingSecondRef.current)
          if (countingSecondRef.current <= 0) {
            //TODO: sound?
            if (timerRef.current) {
              clearInterval(timerRef.current);
              setTimer(null);
              setIsCounting(false);
            }
            return;
          }
          setCountingSecond(--countingSecondRef.current);
        }
      }, 1000);
      setTimer(newTimer);
    }
  }

  const handleReplay = () => {
    console.log(timerRef.current);
    if (timerRef.current) {
      console.log('clearInterval')
      clearInterval(timerRef.current);
      setTimer(null);
    }
    setCountingSecond(second);
    countingSecondRef.current = second;
    setIsCounting(false);
  }

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
            e.currentTarget.select()
          }}
          autoFocus
        />
      </div>
    ) : (
      <div className={styles.main_display} onClick={() => setIsInputting(true)}>
        {numberToMinuteSecond(countingSecond)}
      </div>
    );
  }

  return (
    <div
      className={styles.container}
      onClick={handleBackgroundClick}
    >
      {getTimerOrInput(isInputting)}
      <div className={styles.button_container}>
        <button
          onClick={() => handlePlayPause()}
        >
          {isCounting ? <Pause /> : <PlayArrow />}
        </button>
        <button
          onClick={() => handleReplay()}
        >
          <Replay />
        </button>
      </div>
    </div>
  );
}

export default Counter;