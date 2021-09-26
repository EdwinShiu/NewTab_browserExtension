
export type ValueUnit = {
  value: number,
  unit: string,
}

export type WeatherForecast = {
  date: string;
  week: string;
  weather: string;
  maxTemp: ValueUnit;
  minTemp: ValueUnit;
  maxRH: ValueUnit;
  minRH: ValueUnit;
  iconNumber: number;
  rainProb: string;
}

export type RegionalWeather = {
  location: string,
  temperature: string,
  dateTime: Date,
}