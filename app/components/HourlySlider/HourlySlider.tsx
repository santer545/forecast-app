'use client';

import { HourlyWeather } from '@/app/models/currentWeaher.model';
import React, { useState } from 'react';
import { formatDate } from '@/utils/format';
import { formatTemperature } from './../../../utils/format';
import WeatherStateIcon from '../WeatherStateIcon/WeatherStateicon';
import { WeatherCode } from '@/app/models/weather-code.model';

const HourlySlider = ({ hourlyData }: { hourlyData: HourlyWeather }) => {
  const current = hourlyData.time.findIndex((item) => item.getHours() === new Date().getHours());
  const [currentSlide, setCurrentSlide] = useState(current);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? hourlyData.time.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === hourlyData.time.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-4 overflow-x-hidden h-[200px]">
        {hourlyData.time.map((time, index) => (
          <div
            key={time.getTime()}
            className={`flex-shrink-0 w-24 text-center transition-all duration-300 transform ${
              index === currentSlide ? 'opacity-100' : 'opacity-50'
            }`}
            style={{ transform: `translateX(${-currentSlide * 100}%)` }}
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(time.toISOString())}</p>
            <div className="my-2">
              <WeatherStateIcon
                weatherCode={(hourlyData?.weather_code && hourlyData?.weather_code[index]) || (0 as WeatherCode)}
              />
            </div>
            <p className="font-bold text-gray-900 dark:text-white">
              {hourlyData?.temperature_2m && formatTemperature(hourlyData?.temperature_2m[index])}
            </p>
          </div>
        ))}
      </div>

      {/* Кнопки навігації */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 -translate-y-1/2 p-2 bg-white/70 dark:bg-gray-800/70 rounded-full shadow-md z-10 hover:bg-white dark:hover:bg-gray-700 transition"
        aria-label="Previous hourly forecast"
      >
        <svg
          className="w-5 h-5 text-gray-800 dark:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 -translate-y-1/2 p-2 bg-white/70 dark:bg-gray-800/70 rounded-full shadow-md z-10 hover:bg-white dark:hover:bg-gray-700 transition"
        aria-label="Next hourly forecast"
      >
        <svg
          className="w-5 h-5 text-gray-800 dark:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default HourlySlider;
