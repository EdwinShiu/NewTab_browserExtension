export type MainWeatherInfoType = {
  location: string,
  temp: string | undefined,
  minTemp: string | undefined,
  maxTemp: string | undefined,
  tempUnit: string | undefined,
}

export type AdditionWeatherInfoType = {
  rh: string,
  windDir: string,
  windSpeed: string,
  gustSpeed: string,
  rainfall: string,
  rhUnit: string,
  windSpeedUnit: string,
  rainfallUnit: string,
}

export type RegionalWeather = {
  location: string,
  weatherInfo: WeatherInfo,
}

export type Units = {
  tempUnit: string,
  rhUnit: string,
  windSpeedUnit: string,
  rainfallUnit: string,
}

type WeatherInfo = {
  temp: string,
  minTemp: string,
  maxTemp: string,
  rh: string,
  windDir: string,
  windSpeed: string,
  gustSpeed: string,
  rainfall: string, 
}
