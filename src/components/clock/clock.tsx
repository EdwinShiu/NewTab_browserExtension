import { useState, useEffect } from 'react';
import styles from './clock.module.scss';

const MONTH_NAME = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const Clock = () => {
  const [dateTime, setDateTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(
      () => setDateTime(new Date()),
      1000,
    );

    return () => {
      clearInterval(interval);
    }
  }, []);

  const timeToString = (timeNumber: number): string => {
    return timeNumber < 10 ? `0${timeNumber}` : `${timeNumber}`;
  }

  const getTimeString = (dateTime: Date): string => {
    return `${timeToString(dateTime.getHours())}:${timeToString(dateTime.getMinutes())}`
  }

   const getMonthString = (dateTime: Date): string => {
     return `${dateTime.getDate()} ${MONTH_NAME[dateTime.getMonth()]} ${dateTime.getFullYear()}`;
   }


  return (
    <div className={styles.container}>
      <p className={styles.date}>{getMonthString(dateTime)}</p>
      <p className={styles.time}>{getTimeString(dateTime)}</p>
    </div>
  );
}

export default Clock;