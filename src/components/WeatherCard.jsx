import { CloudRain } from "lucide-react";

const WeatherCard = () => {
  return (
    <div className="bg-[#18181b] p-6 rounded-3xl flex flex-col justify-between h-40 shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>

      <h2 className="text-xl font-semibold text-purple-300 z-10">Weather</h2>

      <div className="flex items-center gap-4 z-10">
        <CloudRain className="w-12 h-12 text-white" />
        <div>
          <p className="text-lg font-medium text-gray-200">
            Patchy rain nearby
          </p>
          <p className="text-sm text-gray-500">Humidity: 65%</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
