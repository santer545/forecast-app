import { WeatherCode } from '@/app/models/weather-code.model';
import Image from 'next/image';
import sunny from '../../../public/sunny.svg';
import cloud from '../../../public/cloud.svg';
import clouds_sun from '../../../public/clouds_sun.svg';
import drizzle from '../../../public/drizzle.svg';
import { getWeatherCodeDescription } from '@/utils/format';

function WeatherStateIcon({ weatherCode }: { weatherCode: WeatherCode | undefined }) {
  let src = '';
  switch (weatherCode) {
    case WeatherCode.ClearSky:
    case WeatherCode.MainlyClear:
      src = sunny;
      break;
    case WeatherCode.PartlyCloudy:
      src = clouds_sun;
      break;
    case WeatherCode.Overcast:
      src = cloud;
      break;
    case WeatherCode.DrizzleDense:
    case WeatherCode.DrizzleLight:
    case WeatherCode.DrizzleModerate:
      src = drizzle;
      break;
    default:
      src = sunny;
  }
  return <Image src={src} alt={getWeatherCodeDescription(weatherCode) ?? 'Weather State'} width={64} height={64} />;
}

export default WeatherStateIcon;
