import { useState } from "react";
import { Search } from "lucide-react";

const WeatherSearch = ({
  city,
  onCityChange,
  data,
  loading,
  error,
  onRetry,
}) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || trimmed === city) return;
    onCityChange(trimmed);
    setInput("");
  };

  return (
    <div className="bg-card-dark p-6 rounded-3xl flex-1 flex flex-col shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
      <h3 className="text-gray-400 font-medium mb-4 text-sm font-mono text-center">
        Weather Report
      </h3>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Cari kota… (aktif: ${city})`}
          aria-label="Cari kota"
          className="flex-1 min-w-0 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-400/60 transition-colors"
        />
        <button
          type="submit"
          aria-label="Cari cuaca"
          className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all duration-200 shadow-lg shadow-indigo-500/20 active:scale-95"
        >
          <Search size={16} />
        </button>
      </form>

      {loading && (
        <div className="space-y-2">
          <div className="h-5 w-28 rounded bg-white/10 animate-pulse" />
          <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
          <div className="h-4 w-3/4 rounded bg-white/10 animate-pulse" />
        </div>
      )}

      {error && !loading && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 z-10 relative">
          <p className="text-sm text-red-400">{error}</p>
          <button
            onClick={onRetry}
            className="mt-2 text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 transition-colors"
          >
            Coba lagi
          </button>
        </div>
      )}

      {data && !loading && !error && (
        <div className="mt-1 p-4 rounded-xl bg-white/3 border border-white/6 backdrop-blur-sm z-10 relative font-mono text-sm tracking-tight">
          <h2 className="text-purple-300 font-semibold text-base mb-3 tracking-normal">
            Hasil untuk: {data.name}
          </h2>
          <ul className="space-y-2 text-gray-200">
            <li className="flex justify-between border-b border-white/4 pb-1">
              <strong className="text-gray-500 font-normal">Suhu</strong>
              <span className="text-purple-300">{data.main.temp}°C</span>
            </li>
            <li className="flex justify-between border-b border-white/4 pb-1">
              <strong className="text-gray-500 font-normal">Kondisi</strong>
              <span className="capitalize text-gray-300">
                {data.weather?.[0]?.description}
              </span>
            </li>
            <li className="flex justify-between border-b border-white/4 pb-1">
              <strong className="text-gray-500 font-normal">Kelembapan</strong>
              <span className="text-gray-300">{data.main.humidity}%</span>
            </li>
            <li className="flex justify-between">
              <strong className="text-gray-500 font-normal">Angin</strong>
              <span className="text-gray-300">{data.wind.speed} m/s</span>
            </li>
          </ul>
        </div>
      )}

      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-card-dark to-transparent pointer-events-none"></div>
    </div>
  );
};

export default WeatherSearch;
