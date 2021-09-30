var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import API from './api.js';
export const getRainfall = (regionalWeatherInfo, data) => {
    data.forEach((element) => {
        if (!regionalWeatherInfo[element['place']]) {
            regionalWeatherInfo[element['place']] = {};
        }
        regionalWeatherInfo[element['place']]['rainfall'] = element['max'];
    });
    return regionalWeatherInfo;
};
export const getTemp = (regionalWeatherInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const regionalTemps = yield API.getCSV('https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_1min_temperature.csv');
    regionalTemps.forEach((regionalTemp) => {
        if (!regionalWeatherInfo[regionalTemp['Automatic Weather Station']]) {
            regionalWeatherInfo[regionalTemp['Automatic Weather Station']] = {};
        }
        regionalWeatherInfo[regionalTemp['Automatic Weather Station']]['temp'] = regionalTemp['Air Temperature(degree Celsius)'];
    });
    return regionalWeatherInfo;
});
export const getMinMaxTemp = (regionalWeatherInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const regionalMinMaxTemps = yield API.getCSV('https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_since_midnight_maxmin.csv');
    regionalMinMaxTemps.forEach((regionalMinMaxTemp) => {
        if (!regionalWeatherInfo[regionalMinMaxTemp['Automatic Weather Station']]) {
            regionalWeatherInfo[regionalMinMaxTemp['Automatic Weather Station']] = {};
        }
        regionalWeatherInfo[regionalMinMaxTemp['Automatic Weather Station']]['minTemp'] = regionalMinMaxTemp['Minimum Air Temperature Since Midnight(degree Celsius)'];
        regionalWeatherInfo[regionalMinMaxTemp['Automatic Weather Station']]['maxTemp'] = regionalMinMaxTemp['Maximum Air Temperature Since Midnight(degree Celsius)'];
    });
    return regionalWeatherInfo;
});
export const getRelativeHumidity = (regionalWeatherInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const regionalRHs = yield API.getCSV('https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_1min_humidity.csv');
    regionalRHs.forEach((regionalRH) => {
        if (!regionalWeatherInfo[regionalRH['Automatic Weather Station']]) {
            regionalWeatherInfo[regionalRH['Automatic Weather Station']] = {};
        }
        regionalWeatherInfo[regionalRH['Automatic Weather Station']]['rh'] = regionalRH['Relative Humidity(percent)'];
    });
    return regionalWeatherInfo;
});
export const getWindSpeed = (regionalWeatherInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const regionalWindSpeeds = yield API.getCSV('https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_10min_wind.csv');
    regionalWindSpeeds.forEach((regionalWindSpeed) => {
        if (!regionalWeatherInfo[regionalWindSpeed['Automatic Weather Station']]) {
            regionalWeatherInfo[regionalWindSpeed['Automatic Weather Station']] = {};
        }
        regionalWeatherInfo[regionalWindSpeed['Automatic Weather Station']]['windDir'] = regionalWindSpeed['10-Minute Mean Wind Direction(Compass points)'];
        regionalWeatherInfo[regionalWindSpeed['Automatic Weather Station']]['windSpeed'] = regionalWindSpeed['10-Minute Mean Speed(km/hour)'];
        regionalWeatherInfo[regionalWindSpeed['Automatic Weather Station']]['gustSpeed'] = regionalWindSpeed['10-Minute Maximum Gust(km/hour)'];
    });
    return regionalWeatherInfo;
});
//# sourceMappingURL=weather.js.map