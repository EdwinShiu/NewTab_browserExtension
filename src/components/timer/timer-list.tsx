import { TimerListType } from '../../types/types/components/timer/counter';
import { numberToMinuteSecond } from '../../utils/numberToMinuteSecond';
import CustomScrollbars from '../ui-elements/scrollbar/scrollbar';
import styles from './timer-list.module.scss';


const TimerList = ({setSecond, timers, addTimer}: TimerListType) => {

  /**
   * This maps the list of second to timer components
   * 
   * @param timers is a list of time in second
   * @returns a list of timer components
   */
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
  
// TODO: Add timer button
  return (
    <div className={styles.container}>
      <CustomScrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
        <div className={styles.add_timer_container}>  
        </div>
        <div className={styles.list_container}>
          {getTimerChildren(timers)} 
        </div>
      </CustomScrollbars>
    </div>
  );
}

export default TimerList;