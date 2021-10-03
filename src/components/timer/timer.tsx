import { Alarm } from '@material-ui/icons';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import BackgroundIconButton from '../ui-elements/buttons/background-button';
import PopupMenu from '../ui-elements/popup-menu/popup-menu';
import Counter from './counter';
import TimerList from './timer-list';
import styles from './timer.module.scss';

const Timer = () =>{

  const buttonRef = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [timers, setTimers] = useState<number[]>([600, 120, 480, 240, 720, 900]);

  const setButtonPosition = () => {
    const rect: DOMRect | undefined = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setLeft(rect.left)
      setTop(rect.top)
    }
  }

  const handleClick = (open: boolean) => {
    setOpen(!open);
  }

  const handleAddTimer = (timer: number) => {
    setTimers([timer, ...timers]);
  }

  const numberToMinuteSecond = (second: number) => {
    const min: number = Math.floor(second / 60);
    const sec: number = second % 60;
    const minString: string = min < 10 ? `0${min}`: `${min}`
    const secString: string = sec < 10 ? `0${sec}`: `${sec}`
    return `${minString}:${secString}`;
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', setButtonPosition);
    setButtonPosition();
    return () => window.removeEventListener('resize', setButtonPosition);
  }, []);

  useEffect(() => {
    setButtonPosition();
  }, [buttonRef]);


  return (
    <div className={styles.container} ref={buttonRef}>
      <PopupMenu
        parentTop={top}
        parentLeft={left}
        open={open}
      >
        <Counter
          second={second}
          setSecond={setSecond}
          numberToMinuteSecond={numberToMinuteSecond}
        />
        <TimerList 
          setSecond={setSecond}
          timers={timers}
          addTimer={handleAddTimer}
          numberToMinuteSecond={numberToMinuteSecond}
        />
      </PopupMenu>
      <BackgroundIconButton
        onClick={() => handleClick(open)}
      >
        <Alarm
          className={styles.button_icon}
        />
      </BackgroundIconButton>
    </div>
  );
}

export default Timer;