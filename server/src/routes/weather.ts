import { Router } from 'express';
import API from '../helper/api.js';
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
    const response: any = await API.getCSV('https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_1min_temperature.csv');
    const regionalTemps: any[] = response;
    res.status(200).json({
      success: true,
      data: {
        'regionalTemps': regionalTemps,
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