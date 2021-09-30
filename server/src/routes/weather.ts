import { Router } from 'express';
import API from '../helper/api.js';
import { getRainfall, getTemp, getMinMaxTemp, getRelativeHumidity, getWindSpeed } from '../helper/weather.js';
import { Response } from 'node-fetch';
import redisClient from '../helper/redis.js';
import { WeatherForecast } from  '../class/weather'

const Weather: Router = Router();



Weather.get('/', (req, res) => {
  res.json('Hello, weather');
});

// Weather.get('/current', async (req, res) => {
//   try {
//     const params: any = req.params;
//     if (!params || !params.region) {
//       throw new Error('No region');
//     }


//   } catch (e: any) {
//     console.log(e);
//     res.status(400).json({
//       'success': false,
//       'error': 'Cannot fetch current weather from HKO.'
//     });
//   }
// });

Weather.get('/regionalTemps', async (_, res) => {
  try {
    let regionalWeatherInfo: any = {};
    const currentWeatherReport: any = await API.get('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread');

    // TODO: Use long, lat for location
    // TODO: Rainfall is in district

    regionalWeatherInfo = getRainfall(regionalWeatherInfo, currentWeatherReport['rainfall']['data']);
    regionalWeatherInfo = await getTemp(regionalWeatherInfo);
    regionalWeatherInfo = await getMinMaxTemp(regionalWeatherInfo);
    regionalWeatherInfo = await getRelativeHumidity(regionalWeatherInfo);
    regionalWeatherInfo = await getWindSpeed(regionalWeatherInfo);
    console.log(regionalWeatherInfo);

    const results: any[] = Object.entries(regionalWeatherInfo).map(([key, value]) => ({
        location: key,
        weatherInfo: value,
      })
    ).filter((element: any) => element.weatherInfo['temp'] !== undefined);

    res.status(200).json({
      success: true,
      data: {
        iconIndexes: currentWeatherReport.icon,
        tempUnit: '\u2103',
        rhUnit: '%',
        windSpeedUnit: 'km/h',
        rainfallUnit: 'mm',
        regionalWeatherInfo: results,
        updateDateTime: Date.now(),
      },
    });
  } catch (e: any) {
    console.log(e);
    res.status(500).json({
      success: false,
      error: 'Cannot fetch regional temp from HKO.'
    });
  }

});

Weather.get('/nineDay', async (_, res) => {
  try {
    const response: any = await API.get('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en');
    console.log(response);

    if (!response.weatherForecast) {
      throw new Error('HKO has no weather info');
    }

    const weatherForecast: WeatherForecast = response.weatherForecast.map((ele: any) => ({
      date: ele.forecastDate,
      week: ele.week,
      weather: ele.forecastWeather,
      maxTemp: ele.forecastMaxtemp,
      minTemp: ele.forecastMintemp,
      maxRH: ele.forecastMaxrh,
      minRH: ele.forecastMinrh,
      iconNumber: ele.ForecastIcon,
      rainProb: ele.PSR,
    }));

    res.status(200).json({
      success: true,
      data: weatherForecast,
    });

  } catch (e: any) {
    console.log(e);
    res.status(500).json({
      success: false,
      error: 'Cannot fetch weather from HKO.'
    });
  }
});


export default Weather