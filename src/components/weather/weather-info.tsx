import { useState, useEffect } from 'react';
import { RegionalWeather } from '../../class/weather';
import { FetchingBlock } from '../../components/general/loading-placeholder';
import API, { APIServiceResponse } from '../../api/api';
import styles from './weather-info.module.scss';
import '../../class/extension';
import { GeneralError } from '../general/error-block';
import WeatherIcons from './weather-icons';

type Units = {
  tempUnit: string,
  rhUnit: string,
  windSpeedUnit: string,
}

const Weather = () => {

  const [regionalWeather, setRegionalWeather] = useState<RegionalWeather[]>([]);
  const [iconIndexes, setIconIndexes] = useState<number[]>([]);
  const [units, setUnits] = useState<Units | null>(null);
  const [isfetching, setIsFetching] = useState<boolean>(true);
  const [currentLocationIndex, setCurrentLocationIndex] = useState<number>(0);

  useEffect(() => {
    const fetchRegionalWeather = async () => {
      const response: APIServiceResponse = await API.weather.getRegionalWeather();
      if (!response.success) {
        return;
      }

      const {regionalWeatherInfo, tempUnit, rhUnit, windSpeedUnit, iconIndexes: icons} = response.data;

      setRegionalWeather(regionalWeatherInfo);
      setUnits({tempUnit, rhUnit, windSpeedUnit});
      setIconIndexes(icons);
      setCurrentLocationIndex(Math.random() * regionalWeatherInfo.length);
      setIsFetching(false);
    }


    fetchRegionalWeather();
  }, []);

  if (isfetching) {
    return (
      <div className={styles.container}>
        <FetchingBlock />
      </div>
    );
  }

  if (regionalWeather.length == 0) {
    return (
      <div className={styles.container}>
        <GeneralError message={'Zero regional weather.'} />
      </div>
    );
  }

  console.log(regionalWeather);

  return (
    <div className={styles.container}>
      <WeatherIcons 
        iconIndexes={iconIndexes}
      />
    </div>
  );
}

export default Weather;