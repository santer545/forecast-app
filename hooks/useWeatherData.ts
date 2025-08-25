'use client';

import { useState, useEffect } from 'react';
import { IsDay } from '@/app/models/currentWeaher.model';
import { WeatherCode } from '@/app/models/weather-code.model';
import { fetchWeatherApi } from 'openmeteo';
import { useMapStore } from '@/app/store/map-store';

interface WeatherParams {
  latitude: number;
  longitude: number;
  timezone?: string;
}

interface WeatherData {
  current: {
    time: Date;
    temperature_2m: number;
    relative_humidity_2m: number;
    is_day: IsDay;
    rain: number;
    weather_code: WeatherCode;
    cloud_cover: number;
    wind_speed_10m: number;
  };
  hourly: {
    time: Date[];
    temperature_2m: Float32Array | undefined;
    relative_humidity_2m: Float32Array | undefined;
    rain: Float32Array | undefined;
    wind_speed_10m: Float32Array | undefined;
    visibility: Float32Array | undefined;
    weather_code: Float32Array | undefined;
  };
  daily: {
    time: Date[];
    sunrise: Date[];
    sunset: Date[];
    weather_code: Float32Array | undefined;
    temperature_2m_max: Float32Array | undefined;
    temperature_2m_min: Float32Array | undefined;
    wind_speed_10m_max: Float32Array | undefined;
    weeklyArray: Array<{
      time: Date;
      weather_code: number;
      temperature_2m_max: number | null;
      temperature_2m_min: number | null;
      wind_speed_10m_max: number | null;
    }>;
  };
}

export const useWeatherData = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { lat, lon, timezone } = useMapStore();

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);

      const apiParams = {
        latitude: lat,
        longitude: lon,
        daily: ['sunrise', 'sunset', 'weather_code', 'temperature_2m_max', 'temperature_2m_min', 'wind_speed_10m_max'],
        hourly: ['temperature_2m', 'relative_humidity_2m', 'rain', 'wind_speed_10m', 'visibility', 'weather_code'],
        current: [
          'temperature_2m',
          'relative_humidity_2m',
          'is_day',
          'rain',
          'weather_code',
          'cloud_cover',
          'wind_speed_10m',
        ],
        timezone: timezone || 'Europe/Kyiv',
      };

      const url = 'https://api.open-meteo.com/v1/forecast';
      const responses = await fetchWeatherApi(url, apiParams);
      const response = responses[0];

      const utcOffsetSeconds = response.utcOffsetSeconds();
      const current = response.current()!;
      const hourly = response.hourly()!;
      const daily = response.daily()!;

      // Define Int64 variables so they can be processed accordingly
      const sunrise = daily.variables(0)!;
      const sunset = daily.variables(1)!;

      const weatherData: WeatherData = {
        current: {
          time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
          temperature_2m: current.variables(0)!.value(),
          relative_humidity_2m: current.variables(1)!.value(),
          is_day: current.variables(2)!.value() as IsDay,
          rain: current.variables(3)!.value(),
          weather_code: current.variables(4)!.value() as WeatherCode,
          cloud_cover: current.variables(5)!.value(),
          wind_speed_10m: current.variables(6)!.value(),
        },
        hourly: {
          time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())]
            .slice(0, 24)
            .map((_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)),
          temperature_2m: hourly.variables(0)!.valuesArray()?.slice(0, 24),
          relative_humidity_2m: hourly.variables(1)!.valuesArray()?.slice(0, 24),
          rain: hourly.variables(2)!.valuesArray()?.slice(0, 24),
          wind_speed_10m: hourly.variables(3)!.valuesArray()?.slice(0, 24),
          visibility: hourly.variables(4)!.valuesArray()?.slice(0, 24),
          weather_code: hourly.variables(5)!.valuesArray()?.slice(0, 24),
        },
        daily: {
          time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
            (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
          ),
          sunrise: [...Array(sunrise.valuesInt64Length())].map(
            (_, i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
          ),
          sunset: [...Array(sunset.valuesInt64Length())].map(
            (_, i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
          ),
          weather_code: daily.variables(2)!.valuesArray() || undefined,
          temperature_2m_max: daily.variables(3)!.valuesArray() || undefined,
          temperature_2m_min: daily.variables(4)!.valuesArray() || undefined,
          wind_speed_10m_max: daily.variables(5)!.valuesArray() || undefined,
          weeklyArray: daily.variables(2)!.valuesArray()
            ? Array.from(daily.variables(2)!.valuesArray()!).map((code, index) => {
                return {
                  time: new Date((Number(daily.time()) + index * daily.interval() + utcOffsetSeconds) * 1000),
                  weather_code: code,
                  temperature_2m_max: daily.variables(3)?.valuesArray()?.[index] ?? null,
                  temperature_2m_min: daily.variables(4)?.valuesArray()?.[index] ?? null,
                  wind_speed_10m_max: daily.variables(5)?.valuesArray()?.[index] ?? null,
                };
              })
            : [],
        },
      };

      setData(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce the API call to prevent too many requests when dragging the map
    const timeoutId = setTimeout(() => {
      fetchWeatherData();
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [lat, lon, timezone]);

  return {
    data,
    loading,
    error,
    refetch: fetchWeatherData,
  };
};
