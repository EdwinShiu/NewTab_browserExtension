import { useState, useEffect } from "react";
import { MONTH_NAME } from "../../types/constants/component_constants";
import styles from "./clock.module.scss";

/**
 * This shows the dateTime.
 * It will refresh itself for every second.
 *
 * @returns a Clock component
 */
const Clock = () => {
  const [dateTime, setDateTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  /**
   * Convert the number to a two character string.
   *
   * @param timeNumber is the number that shows the time
   * @returns a time string in 'nn' format
   */
  const timeToString = (timeNumber: number): string => {
    return timeNumber < 10 ? `0${timeNumber}` : `${timeNumber}`;
  };

  /**
   * Convert the dateTime to 'hh:mm' format.
   *
   * @param dateTime is the Date object
   * @returns a string in 'hh:mm' format
   */
  const getTimeString = (dateTime: Date): string => {
    return `${timeToString(dateTime.getHours())}:${timeToString(
      dateTime.getMinutes()
    )}`;
  };

  /**
   * Convert the dateTime to 'dd mmm yyyy' format.
   *
   * @param dateTime is the Date object
   * @returns a string in 'dd mmm yyyy' format
   */
  const getMonthString = (dateTime: Date): string => {
    return `${dateTime.getDate()} ${
      MONTH_NAME[dateTime.getMonth()]
    } ${dateTime.getFullYear()}`;
  };

  return (
    <div className={styles.container}>
      <p className={styles.date}>{getMonthString(dateTime)}</p>
      <p className={styles.time}>{getTimeString(dateTime)}</p>
    </div>
  );
};

export default Clock;
