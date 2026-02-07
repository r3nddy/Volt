import { getCurrentWeather } from "../services/weatherService";
import { useState } from "react";

const Notification = () => {
  const [dataCuaca, setDataCuaca] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city) => {
    setLoading(true);
    try {
      const data = await getCurrentWeather(city);
      setDataCuaca(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card-dark p-6 rounded-3xl flex-1 flex flex-col shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
      <h3 className="text-gray-400 font-medium mb-4 text-sm font-mono text-center">
        Weather Report
      </h3>
      <div className="text-white bg-card-dark">
        <button
          onClick={() => handleSearch("samarinda")}
          className="w-full mb-4 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/20 active:scale-95 flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Samarinda
        </button>
        {loading && <p>Loading...</p>}
        {dataCuaca && (
          <div className="mt-5 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm z-10 relative">
            <h2 className="text-blue-400 font-bold text-lg mb-2">
              Hasil untuk: {dataCuaca.name}
            </h2>
            <ul className="space-y-2 text-gray-200">
              <li className="flex justify-between border-b border-white/5 pb-1">
                <strong className="text-gray-400">Suhu:</strong>
                <span className="text-orange-400 font-mono">
                  {dataCuaca.main.temp}°C
                </span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1">
                <strong className="text-gray-400">Kondisi:</strong>
                <span className="capitalize">
                  {dataCuaca.weather[0].description}
                </span>
              </li>
              <li className="flex justify-between border-b border-white/5 pb-1">
                <strong className="text-gray-400">Kelembapan:</strong>
                <span>{dataCuaca.main.humidity}%</span>
              </li>
              <li className="flex justify-between">
                <strong className="text-gray-400">Angin:</strong>
                <span>{dataCuaca.wind.speed} m/s</span>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-linear-to-t from-card-dark to-transparent"></div>
    </div>
  );
};

export default Notification;
