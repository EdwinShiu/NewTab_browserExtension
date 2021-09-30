import { MouseEventHandler, useState } from 'react';
import styles from './weather-icons.module.scss';

const WeatherIcons = ({iconIndexes}: {iconIndexes: number[]}) => {

  const [iconIndex, setIconIndex] = useState<number>(0);

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