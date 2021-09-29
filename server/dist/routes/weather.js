var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import API from '../helper/api.js';
import { getTemp, getMinMaxTemp, getRelativeHumidity, getWindSpeed } from '../helper/weather.js';
const Weather = Router();
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
Weather.get('/regionalTemps', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let regionalWeatherInfo = {};
        const currentWeatherReport = yield API.get('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread');
        regionalWeatherInfo = yield getTemp(regionalWeatherInfo);
        regionalWeatherInfo = yield getMinMaxTemp(regionalWeatherInfo);
        regionalWeatherInfo = yield getRelativeHumidity(regionalWeatherInfo);
        regionalWeatherInfo = yield getWindSpeed(regionalWeatherInfo);
        console.log(regionalWeatherInfo);
        const results = Object.entries(regionalWeatherInfo).map(([key, value]) => {
            return {
                location: key,
                weatherInfo: value,
            };
        });
        res.status(200).json({
            success: true,
            data: {
                iconIndexes: currentWeatherReport.icon,
                tempUnit: '\u2103',
                rhUnit: '%',
                windSpeedUnit: 'km/h',
                regionalWeatherInfo: results,
            },
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            error: 'Cannot fetch regional temp from HKO.'
        });
    }
}));
Weather.get('/nineDay', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield API.get('https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en');
        console.log(response);
        if (!response.weatherForecast) {
            throw new Error('HKO has no weather info');
        }
        const weatherForecast = response.weatherForecast.map((ele) => ({
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
    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            error: 'Cannot fetch weather from HKO.'
        });
    }
}));
export default Weather;
//# sourceMappingURL=weather.js.map