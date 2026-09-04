import { ArrowRight, Lock } from "lucide-react";
import { useState, useEffect } from "react";
import { GlobePulse } from "./GlobePulse";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // ambil jam dan menit (format 12 jam)
  const raw = currentTime
    .toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .split(" ")[0]
    .replace(".", ":");

  const [hours, minutes] = raw.split(":");

  // format PM/AM
  const period = currentTime.getHours() >= 12 ? "PM" : "AM";

  const dateString = currentTime.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="bg-card-dark h-full flex flex-col items-center justify-center relative p-8">
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-baseline gap-4 mb-2">
          <h1 className="text-7xl font-bold text-white tracking-tight [font-variant-numeric:tabular-nums]">
            <span>{hours}</span>
            <span className="animate-[blink_1s_step-end_infinite] relative -top-3">:</span>
            <span>{minutes}</span>
          </h1>
          <span className="text-3xl font-semibold text-green-400">
            {period}
          </span>
        </div>
        <p className="text-2xl text-green-200/80 font-medium">{dateString}</p>
      </div>

      <div className="relative mb-8 group">
        <div className="w-96 h-96 rounded-full overflow-hidden">
          <GlobePulse />
        </div>
      </div>

      {/* slider */}
      <div className="w-full max-w-sm h-14 bg-card-dark rounded-full flex items-center justify-between px-2 relative group cursor-pointer hover:bg-[#202025] transition-colors shadow-lg">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-gray-500">
          <Lock size={18} />
        </div>

        <div className="flex gap-2 opacity-50">
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
          <div className="w-2 h-2 rounded-full bg-gray-600"></div>
          <div className="w-2 h-2 rounded-full bg-white"></div>
          <div className="w-2 h-2 rounded-full bg-white"></div>
        </div>

        <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-black shadow-[0_0_15px_rgba(86,191,140,0.5)]">
          <ArrowRight size={20} />
        </div>
      </div>
    </div>
  );
};

export default Clock;
