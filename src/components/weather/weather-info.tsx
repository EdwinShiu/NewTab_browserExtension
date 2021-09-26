import { useState, useEffect } from 'react';
import { RegionalWeather } from '../../class/weather';
import API, { APIServiceResponse } from '../../api/api';
import styles from './weather-info.module.scss';
import '../../class/extension';

const Weather = () => {

  const [regionalWeather, setRegionalWeather] = useState<RegionalWeather[]>([]);
  const [isfetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    const fetchRegionalWeather = async () => {
      const response: APIServiceResponse = await API.weather.getRegionalWeather();
      const regionalTemps = response.data?.regionalTemps?.map((temp: any) => {
        return {
          temperature: temp['Air Temperature(degree Celsius)'],
          location: temp['Automatic Weather Station'],
          dateTime: temp['Date time'].ConvertToDateFromYMDHM(),
        }
      }) ?? [];
      setRegionalWeather(regionalTemps)
      setIsFetching(false);
    }


    fetchRegionalWeather();
  }, []);

  if (isfetching) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  console.log(regionalWeather);

  return (
    <div
      className={styles.container}
    >
      test
    </div>
  );
}

export default Weather;