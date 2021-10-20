import { MouseEventHandler, useState } from 'react';
import styles from './weather-icons.module.scss';

/**
 * This function returns an icon corresponding to the iconIndex.
 * 
 * @param iconIndex is the iconIndexes provided by HKO 
 * @returns an icon component
 */
const WeatherIcons = ({iconIndexes}: {iconIndexes: number[]}) => {

  const [iconIndex, setIconIndex] = useState<number>(0);

  /**
   * This function changes the image if there are more than 1 iconIndexes
   * 
   * @param e is a mouse event
   */
  const weatherIconOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIconIndex((iconIndex + 1) % iconIndexes.length);
  }

  if (iconIndexes.length === 0) {
    return (
      <div className={styles.container}>
        No Image
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.weather_button}
        onClick={weatherIconOnClick}
        type='button'
      >
        <img src={require(`../../assets/icons/weather/pic${iconIndexes[iconIndex]}.png`).default} alt={`pic${iconIndexes[iconIndex]}.png`} />
      </button>
    </div>
  );
}

export default WeatherIcons;