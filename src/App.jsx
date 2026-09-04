import { useState } from "react";
import ArchCard from "./components/ArchCard";
import Clock from "./components/Clock";
import MusicPlayer from "./components/MusicPlayer";
import BriefingCard from "./components/BriefingCard";
import TriviaCard from "./components/TriviaCard";
import Stats from "./components/Stats";
import WeatherCard from "./components/WeatherCard";
import { useWeather } from "./hooks/useWeather";

function App() {
  const [city, setCity] = useState("Samarinda");
  const weather = useWeather(city);

  return (
    <div className="min-h-screen bg-bg-dark text-white p-8 flex items-start justify-center font-sans selection:bg-green-500/30">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl h-full md:h-[80vh] max-h-225">
        {/* kolom kiri */}
        <div className="flex flex-col gap-6 lg:col-span-1 h-full">
          <WeatherCard
            data={weather.data}
            loading={weather.loading}
            error={weather.error}
            onRetry={weather.retry}
          />
          <ArchCard />
          <MusicPlayer />
        </div>
        {/* kolom tengah */}
        <div className="flex flex-col gap-6 lg:col-span-2 h-full">
          <div className="rounded-3xl overflow-hidden h-full bg-card-dark shadow-lg">
            <Clock />
          </div>
        </div>
        {/* kolom kanan */}
        <div className="flex flex-col gap-6 lg:col-span-1 h-full">
          <Stats />
          <BriefingCard
            city={city}
            onCityChange={setCity}
            data={weather.data}
            loading={weather.loading}
            error={weather.error}
            onRetry={weather.retry}
          />
          <TriviaCard />
        </div>
      </div>
    </div>
  );
}

export default App;
