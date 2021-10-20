import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import { MainWeatherInfoType } from '../../types/types/components/weather/weather';
import DegreeCelsius from '../general/degree-celsius';
import styles from './main-weather-info.module.scss';

/**
 * This function creates a component showing the main weather info.
 * 
 * @param param0 is an object of all main weather info
 * @returns a component showing the main weather info
 */
const MainWeatherInfo = ({location, temp, minTemp, maxTemp, tempUnit}: MainWeatherInfoType) => {

  const tempString: string = temp ?? '--';
  return (
    <div className={styles.container}>
      <div className={styles.location}>{location}</div>
      <div className={styles.temp}>
        <span>{tempString}</span>
        <DegreeCelsius 
          fontSize={32}
        />
      </div>
      <div className={styles.minmax_container}>
        <div className={styles.temp_container}>
          <KeyboardArrowDown
            className={styles.min_icon}
          />
          <span>{minTemp}</span>
        </div>
        <div className={styles.temp_container}>
          <KeyboardArrowUp
            className={styles.max_icon}
          />
          <span>{maxTemp}</span>
        </div>
      </div>
    </div>
  );
}

export default MainWeatherInfo;