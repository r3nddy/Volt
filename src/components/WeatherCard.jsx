import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
} from "lucide-react";

// peta kondisi OpenWeather ikon lucide
const ICON_MAP = {
  Clear: Sun,
  Clouds: CloudSun,
  Rain: CloudRain,
  Drizzle: CloudDrizzle,
  Thunderstorm: CloudLightning,
  Snow: CloudSnow,
  Mist: CloudFog,
  Smoke: CloudFog,
  Haze: CloudFog,
  Fog: CloudFog,
  Dust: CloudFog,
  Sand: CloudFog,
  Ash: CloudFog,
  Squall: CloudFog,
};

const Skeleton = () => (
  <>
    <div className="h-5 w-20 rounded-lg bg-white/10 animate-pulse" />
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-white/10 animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 w-32 rounded bg-white/10 animate-pulse" />
        <div className="h-3 w-24 rounded bg-white/10 animate-pulse" />
      </div>
    </div>
  </>
);

const WeatherCard = ({ data, loading, error, onRetry }) => {
  const Icon = ICON_MAP[data?.weather?.[0]?.main] ?? Cloud;

  return (
    <div className="bg-card-dark p-6 rounded-3xl flex flex-col justify-between h-40 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>

      {loading && <Skeleton />}

      {error && !loading && (
        <>
          <h2 className="text-xl font-semibold text-purple-300 z-10">
            Weather
          </h2>
          <div className="z-10 flex items-center justify-between gap-2">
            <p className="text-sm text-red-400">{error}</p>
            <button
              onClick={onRetry}
              className="text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 transition-colors"
            >
              Coba lagi
            </button>
          </div>
        </>
      )}

      {data && !loading && !error && (
        <>
          <div className="flex items-baseline justify-between z-10">
            <h2 className="text-xl font-semibold text-purple-300">
              {data.name}
            </h2>
            <p className="text-2xl font-bold text-white">
              {Math.round(data.main.temp)}°C
            </p>
          </div>

          <div className="flex items-center gap-4 z-10">
            <Icon className="w-12 h-12 text-white" />
            <div>
              <p className="text-lg font-medium text-gray-200 capitalize">
                {data.weather?.[0]?.description}
              </p>
              <p className="text-sm text-gray-400">
                Kelembapan: {data.main.humidity}%
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherCard;
