import { CurrentWeather, DailyItem, HourlyWeather } from '@/app/models/currentWeaher.model';
import { getDayName, getWeatherCodeDescription } from '@/utils/format';
import HourlySlider from '../HourlySlider/HourlySlider';
import { formatTemperature } from './../../../utils/format';
import WeatherStateIcon from '../WeatherStateIcon/WeatherStateicon';
import Image from 'next/image';
import humidity from '../../../public/humidity.svg';
import wind from '../../../public/wind.svg';
import cloudeCover from '../../../public/cloud-cover.svg';

const WeatherDashboard = ({
  currentWeatherData,
  hourlyWeatherData,
  dailyWeatherData,
}: {
  currentWeatherData?: CurrentWeather;
  hourlyWeatherData?: HourlyWeather;
  dailyWeatherData?: DailyItem;
}) => {
  const isCurrentWeather = !!currentWeatherData;

  return (
    <div className="w-full">
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
        {/* Main Temperature Section */}
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                  {getDayName(currentWeatherData?.time?.toISOString() || dailyWeatherData?.time?.toISOString())}
                </h3>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {formatTemperature(currentWeatherData?.temperature_2m || dailyWeatherData?.temperature_2m_max)}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                {getWeatherCodeDescription(currentWeatherData?.weather_code || dailyWeatherData?.weather_code)}
              </p>
              {dailyWeatherData?.temperature_2m_min && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Low: {formatTemperature(dailyWeatherData.temperature_2m_min)}
                </p>
              )}
            </div>
            <div className="flex-shrink-0 ml-6 transform hover:scale-110 transition-transform duration-300">
              <WeatherStateIcon weatherCode={currentWeatherData?.weather_code || dailyWeatherData?.weather_code} />
            </div>
          </div>

          {/* Weather Metrics Grid - Only show for current weather */}
          {isCurrentWeather && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              {/* Humidity Card */}
              <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/30 dark:border-gray-600/30 hover:shadow-lg transition-all duration-300 group">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                    <Image src={humidity} alt="Humidity" width={24} height={24} className="opacity-70" />
                  </div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Humidity
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {currentWeatherData?.relative_humidity_2m}%
                  </div>
                </div>
              </div>

              {/* Wind Speed Card */}
              <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/30 dark:border-gray-600/30 hover:shadow-lg transition-all duration-300 group">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors">
                    <Image src={wind} alt="Wind speed" width={24} height={24} className="opacity-70" />
                  </div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Wind
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {currentWeatherData?.wind_speed_10m?.toFixed(1)} m/s
                  </div>
                </div>
              </div>

              {/* Cloud Cover Card */}
              <div className="bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/30 dark:border-gray-600/30 hover:shadow-lg transition-all duration-300 group">
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                    <Image src={cloudeCover} alt="Cloud cover" width={24} height={24} className="opacity-70" />
                  </div>
                  <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Clouds
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {currentWeatherData?.cloud_cover}%
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Hourly Forecast Section */}
          {hourlyWeatherData && (
            <div className="mt-6 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <div className="h-1 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                24-Hour Forecast
              </h4>
              <HourlySlider hourlyData={hourlyWeatherData} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
