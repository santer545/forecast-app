import { WeatherCode } from './weather-code.model';
import WeeklyWeather from './../week/page';

export interface WeatherResponse {
  current: CurrentWeather;
  hourly: HourlyWeather;
  daily: DailyWeather;
}

export interface HourlyWeather {
  time: Date[];
  temperature_2m: Float32Array<ArrayBufferLike> | undefined;
  relative_humidity_2m: Float32Array<ArrayBufferLike> | undefined;
  rain: Float32Array<ArrayBufferLike> | undefined;
  wind_speed_10m: Float32Array<ArrayBufferLike> | undefined;
  visibility: Float32Array<ArrayBufferLike> | undefined;
  weather_code: Float32Array<ArrayBufferLike> | undefined;
}

export interface CurrentWeather {
  time: Date;
  temperature_2m: number;
  relative_humidity_2m: number;
  is_day: IsDay;
  rain: number;
  weather_code: WeatherCode;
  cloud_cover: number;
  wind_speed_10m: number;
}

export interface DailyWeather {
  time: Date[];
  sunrise: Date[];
  sunset: Date[];
  weather_code: Float32Array<ArrayBufferLike> | undefined;
  temperature_2m_max: Float32Array<ArrayBufferLike> | undefined;
  temperature_2m_min: Float32Array<ArrayBufferLike> | undefined;
  wind_speed_10m_max: Float32Array<ArrayBufferLike> | undefined;
  weeklyArray: DailyItem[];
}

export interface DailyItem {
  time: Date;
  weather_code: WeatherCode;
  temperature_2m_max: number | null;
  temperature_2m_min: number | null;
  wind_speed_10m_max: number | null;
}

export type IsDay = 0 | 1;
