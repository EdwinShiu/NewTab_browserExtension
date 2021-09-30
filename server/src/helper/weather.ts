import API from './api.js';



export const getRainfall = (regionalWeatherInfo: any, data: any[]) => {
  data.forEach((element) => {
    if (!regionalWeatherInfo[element['place']]) {
      regionalWeatherInfo[element['place']] = {};
    }
    regionalWeatherInfo[element['place']]['rainfall'] = element['max'];
  })

  return regionalWeatherInfo;
}


export const getTemp = async (regionalWeatherInfo: any) => {
  const regionalTemps: any[] = await API.getCSV('https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_1min_temperature.csv');

  regionalTemps.forEach((regionalTemp) => {
    if (!regionalWeatherInfo[regionalTemp['Automatic Weather Station']]) {
      regionalWeatherInfo[regionalTemp['Automatic Weather Station']] = {};
    }
    regionalWeatherInfo[regionalTemp['Automatic Weather Station']]['temp'] = regionalTemp['Air Temperature(degree Celsius)'];
  })

  return regionalWeatherInfo;
}

export const getMinMaxTemp = async (regionalWeatherInfo: any) => {
  const regionalMinMaxTemps: any[] = await API.getCSV('https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_since_midnight_maxmin.csv');

  regionalMinMaxTemps.forEach((regionalMinMaxTemp) => {
    if (!regionalWeatherInfo[regionalMinMaxTemp['Automatic Weather Station']]) {
      regionalWeatherInfo[regionalMinMaxTemp['Automatic Weather Station']] = {};
    }
    regionalWeatherInfo[regionalMinMaxTemp['Automatic Weather Station']]['minTemp'] = regionalMinMaxTemp['Minimum Air Temperature Since Midnight(degree Celsius)'];
    regionalWeatherInfo[regionalMinMaxTemp['Automatic Weather Station']]['maxTemp'] = regionalMinMaxTemp['Maximum Air Temperature Since Midnight(degree Celsius)'];
  })

  return regionalWeatherInfo;
}

export const getRelativeHumidity = async (regionalWeatherInfo: any) => {
  const regionalRHs: any[] = await API.getCSV('https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_1min_humidity.csv');

  regionalRHs.forEach((regionalRH) => {
    if (!regionalWeatherInfo[regionalRH['Automatic Weather Station']]) {
      regionalWeatherInfo[regionalRH['Automatic Weather Station']] = {};
    }
    regionalWeatherInfo[regionalRH['Automatic Weather Station']]['rh'] = regionalRH['Relative Humidity(percent)'];
  })

  return regionalWeatherInfo;
}

export const getWindSpeed = async (regionalWeatherInfo: any) => {
  const regionalWindSpeeds: any[] = await API.getCSV('https://data.weather.gov.hk/weatherAPI/hko_data/regional-weather/latest_10min_wind.csv');

  regionalWindSpeeds.forEach((regionalWindSpeed) => {
    if (!regionalWeatherInfo[regionalWindSpeed['Automatic Weather Station']]) {
      regionalWeatherInfo[regionalWindSpeed['Automatic Weather Station']] = {};
    }
    regionalWeatherInfo[regionalWindSpeed['Automatic Weather Station']]['windDir'] = regionalWindSpeed['10-Minute Mean Wind Direction(Compass points)'];
    regionalWeatherInfo[regionalWindSpeed['Automatic Weather Station']]['windSpeed'] = regionalWindSpeed['10-Minute Mean Speed(km/hour)'];
    regionalWeatherInfo[regionalWindSpeed['Automatic Weather Station']]['gustSpeed'] = regionalWindSpeed['10-Minute Maximum Gust(km/hour)'];
  })

  return regionalWeatherInfo;
}