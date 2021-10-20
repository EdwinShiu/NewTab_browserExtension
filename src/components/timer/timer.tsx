import { Alarm } from '@material-ui/icons';
import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import BackgroundIconButton from '../ui-elements/buttons/background-button';
import PopupMenu from '../ui-elements/popup-menu/popup-menu';
import Counter from './counter';
import TimerList from './timer-list';
import styles from './timer.module.scss';

/**
 * This is the Timer component, containing all the timers.
 * 
 * @returns a timer pop-up component
 */
const Timer = () =>{

  const buttonRef = useRef<HTMLDivElement>(null);
  // Position of the modal
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  // List of timers
  const [timers, setTimers] = useState<number[]>([600, 120, 480, 240, 720, 900]); // Dummy data

  const setButtonPosition = () => {
    const rect: DOMRect | undefined = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setLeft(rect.left)
      setTop(rect.top)
    }
  }

  // This function is called when the timer button is pressed
  const handleClick = (open: boolean) => {
    setOpen(!open);
  }

  // This function is called when a new timer is added to the list
  const handleAddTimer = (timer: number) => {
    setTimers([timer, ...timers]);
  }

  // This adds a listener to window resize event
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
        />
        <TimerList 
          setSecond={setSecond}
          timers={timers}
          addTimer={handleAddTimer}
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