'use client';
import { useWeatherData } from '@/hooks/useWeatherData';
import WeatherDashboard from './Widget';
import ErrorBox from '../Error-box/Error-box';

function WidgetHolder() {
  const { data, loading, error, refetch } = useWeatherData();

  if (loading)
    return (
      <div className="w-full">
        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm animate-pulse">
          <div className="p-6 md:p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
              </div>
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/60 dark:bg-gray-700/60 rounded-xl p-4 space-y-2">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-lg mx-auto"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-12 mx-auto"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  if (error) return <ErrorBox message={error} onClose={refetch} />;
  if (!data)
    return (
      <div className="w-full flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-lg">No weather data available</p>
        </div>
      </div>
    );

  return <WeatherDashboard currentWeatherData={data?.current} hourlyWeatherData={data?.hourly} />;
}

export default WidgetHolder;
