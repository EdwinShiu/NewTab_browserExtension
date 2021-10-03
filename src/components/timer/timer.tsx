import { Alarm } from '@material-ui/icons';
import { LegacyRef, MutableRefObject, useEffect, useRef, useState, useLayoutEffect } from 'react';
import BackgroundIconButton from '../ui-elements/buttons/background-button';
import PopupMenu from '../ui-elements/popup-menu/popup-menu';
import Counter from './counter';
import styles from './timer.module.scss';

const Timer = () =>{

  const buttonRef = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);
  const [second, setSecond] = useState<number>(0);

  const setButtonPosition = () => {
    const rect: DOMRect | undefined = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setLeft(rect.left)
      setTop(rect.top)
    }
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
      >
        <Counter
          second={second}
          setSecond={setSecond}
        />
        <div className={styles.list_container}>
  
        </div>
      </PopupMenu>
      <BackgroundIconButton>
        <Alarm
          className={styles.button_icon}
        />
      </BackgroundIconButton>
    </div>
  );
}

export default Timer;