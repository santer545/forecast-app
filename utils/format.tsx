import { WeatherCode } from '@/app/models/weather-code.model';

export const getWeatherCodeDescription = (weatherCode: WeatherCode | undefined) => {
  if (!weatherCode) return;
  return Object.keys(WeatherCode)
    .find((key) => WeatherCode[key as keyof typeof WeatherCode] === weatherCode)
    ?.replace(/([a-z])([A-Z])/g, '$1 $2');
};

export const formatDate = (date: string) => {
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
};

export const formatTemperature = (temperature: number | undefined | null) => {
  return temperature === undefined || temperature === null || isNaN(temperature)
    ? 'Wrong data'
    : `${temperature.toFixed(0)} °C`;
};

export const getDayName = (dateIsoString: string | undefined): string => {
  if (!dateIsoString) return '';
  const date = new Date(dateIsoString);
  const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
  return date.toLocaleDateString('en-US', options);
};
