import CustomScrollbars from '../ui-elements/scrollbar/scrollbar';
import styles from './timer-list.module.scss';

type TimerListType = {
  setSecond: Function,
  timers: number[],
  addTimer: Function,
  numberToMinuteSecond: Function,
}

const TimerList = ({setSecond, timers, addTimer, numberToMinuteSecond}: TimerListType) => {

  const getTimerChildren = (timers: number[]) => {
    return timers.map((timer, index) => (
      <button 
        key={index}
        className={styles.timer_element}
        onClick={() => setSecond(timer)}
        type='button'
      >
        {numberToMinuteSecond(timer)}
      </button>
    ));
  }

  return (
    <div className={styles.container}>
      <CustomScrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
      <div className={styles.list_container}>
        {getTimerChildren(timers)} 
      </div>
      </CustomScrollbars>
    </div>
  );
}

export default TimerList;