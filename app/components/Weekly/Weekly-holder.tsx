'use client';
import { useWeatherData } from '@/hooks/useWeatherData';
import WeatherDashboard from '../Widget/Widget';
import ErrorBox from '../Error-box/Error-box';

const WeeklyHolder = () => {
  const { data, loading, error, refetch } = useWeatherData();

  if (loading)
    return (
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-4">
          <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg w-64 animate-pulse"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 animate-pulse"></div>
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-6 animate-pulse"
            >
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full ml-auto"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  if (error) return <ErrorBox message={error} onClose={refetch} />;
  if (!data)
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-6">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-blue-500 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">No Weekly Data Available</h3>
          <p className="text-gray-500 dark:text-gray-400">Unable to load the 7-day weather forecast</p>
        </div>
      </div>
    );

  return (
    <div className="space-y-8">
      {/* Enhanced Header Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl"></div>
        <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-gray-200/50 dark:border-gray-700/50 p-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  7-Day Forecast
                </h1>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg pl-5">
                Your complete week ahead • Updated every hour
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.daily?.weeklyArray.map((day, index) => (
          <div
            key={day.time.getTime()}
            className="transform hover:scale-105 transition-all duration-300 hover:z-10 relative"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <WeatherDashboard dailyWeatherData={day} />
          </div>
        ))}
      </div>

      {/* Weekly Summary Stats */}
      {data?.daily?.weeklyArray && data.daily.weeklyArray.length > 0 && (
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-700/30 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            Week Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {Math.max(...(data.daily.temperature_2m_max?.slice(0, 7) || [0])).toFixed(1)}°
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Highest</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {Math.min(...(data.daily.temperature_2m_min?.slice(0, 7) || [0])).toFixed(1)}°
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Lowest</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {Math.max(...(data.daily.wind_speed_10m_max?.slice(0, 7) || [0])).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Max Wind (m/s)</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Days</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklyHolder;
