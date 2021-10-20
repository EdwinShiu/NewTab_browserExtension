import React, { useState, useEffect } from 'react';
import { FetchingBlock } from '../../components/general/loading-placeholder';
import API from '../../api/api';
import { APIServiceResponse } from '../../types/types/api';
import styles from './weather-info.module.scss';
import '../../utils/extension';
import { GeneralError } from '../general/error-block';
import WeatherIcons from './weather-icons';
import Dropdown from '../ui-elements/dropdown/dropdown';
import MainWeatherInfo from './main-weather-info';
import { Autorenew, MoreVert } from '@material-ui/icons';
import BackgroundIconButton from '../ui-elements/buttons/background-button';
import AdditionWeatherInfo from './additional-weather-info';
import { RegionalWeather, Units } from '../../types/types/components/weather/weather';

/**
 * This function creates a weather information component.
 * 
 * @returns a comprehensive weather information component
 */
const Weather = () => {
  const NOW: Date = new Date(Date.now());
  const [regionalWeather, setRegionalWeather] = useState<RegionalWeather[]>([]);
  const [updateDateTime, setUpdateDateTime] = useState<Date>(NOW);
  const [iconIndexes, setIconIndexes] = useState<number[]>([]);
  const [units, setUnits] = useState<Units | null>(null);
  const [isfetching, setIsFetching] = useState<boolean>(true);
  const [currentLocationIndex, setCurrentLocationIndex] = useState<number>(0);

  // Fetch the regional weather on mount
  useEffect(() => {
    fetchRegionalWeather();
  }, []);

  const fetchRegionalWeather = async () => {
    const response: APIServiceResponse = await API.weather.getRegionalWeather();
    if (!response.success) {
      return;
    }

    const {regionalWeatherInfo, tempUnit, rhUnit, windSpeedUnit, rainfallUnit, iconIndexes: icons, updateDateTime} = response.data;

    setUpdateDateTime(new Date(updateDateTime));
    setRegionalWeather(regionalWeatherInfo);
    setUnits({tempUnit, rhUnit, windSpeedUnit, rainfallUnit});
    setIconIndexes(icons);
    setCurrentLocationIndex(Math.floor(Math.random() * regionalWeatherInfo.length));
    setIsFetching(false);
  }

  // TODO: Add dropdown for location
  const onDropdownChange = (index: number) => {
    setCurrentLocationIndex(index);
  }

  const onForecastClick = () => {
    //TODO: show popup 9-day forecast
    console.log('forecast');
  }

  const onMoreClick = () => {
    //TODO: show popup menu
    console.log('more');
  }

  // Fetch the weather info again
  const onReloadClick = () => {
    setIsFetching(true);
    fetchRegionalWeather();
  }

  // When loading
  if (isfetching) {
    return (
      <div className={styles.container}>
        <FetchingBlock />
      </div>
    );
  }

  // When there is no regional weather
  if (regionalWeather.length == 0) {
    return (
      <div className={styles.container}>
        <GeneralError message={'Zero regional weather.'} />
      </div>
    );
  }

  console.log(regionalWeather);
  const selectedRegionalWeather = regionalWeather[currentLocationIndex];

  return (
    <div className={styles.container}>
      <WeatherIcons 
        iconIndexes={iconIndexes}
      />
      <MainWeatherInfo 
        location={selectedRegionalWeather.location}
        temp={selectedRegionalWeather.weatherInfo.temp}
        minTemp={selectedRegionalWeather.weatherInfo.minTemp}
        maxTemp={selectedRegionalWeather.weatherInfo.maxTemp}
        tempUnit={units?.tempUnit ?? '\u2013'}
      />
      <BackgroundIconButton
        className={styles.more_button}
        onClick={onMoreClick}
      >
        <MoreVert
          className={styles.button_icon}
        />
      </BackgroundIconButton>
      <BackgroundIconButton
        className={styles.reload_button}
        onClick={onReloadClick}
      >
        <Autorenew
          className={styles.button_icon}
        />
      </BackgroundIconButton>
      <AdditionWeatherInfo
        rh={selectedRegionalWeather.weatherInfo.rh}
        windDir={selectedRegionalWeather.weatherInfo.windDir}
        windSpeed={selectedRegionalWeather.weatherInfo.windSpeed}
        gustSpeed={selectedRegionalWeather.weatherInfo.gustSpeed}
        rainfall={selectedRegionalWeather.weatherInfo.rainfall}
        rhUnit={units?.rhUnit ?? '%'}
        windSpeedUnit={units?.windSpeedUnit ?? 'km/h'}
        rainfallUnit={units?.rainfallUnit ?? 'mm'}
      />
      <div className={styles.footer_container}>
        <span>{`Updated at ${updateDateTime.toYMDHM()}`}</span>
        <button
          className={styles.forecast_button}
          type='button'
          onClick={onForecastClick}
        >
          Forecast
        </button>
      </div>
      {/* <Dropdown
        list={regionalWeather.map(weather => weather.location)}
        value={currentLocationIndex}
        onChange={onDropdownChange}
      /> */}
    </div>
  );
}

export default Weather;