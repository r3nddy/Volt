import { ArrowRight, Lock } from "lucide-react";
import { useState, useEffect } from "react";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // ambil jam dan menit (format 12 jam)
  const time = currentTime
    .toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .split(" ")[0]
    .replace(".", ":");

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
      <div className="flex flex-col items-center mb-12">
        <div className="flex items-baseline gap-4 mb-2">
          <h1 className="text-8xl font-bold text-white tracking-tight">
            {time}
          </h1>
          <span className="text-4xl font-semibold text-purple-400">
            {period}
          </span>
        </div>
        <p className="text-2xl text-purple-200/80 font-medium">{dateString}</p>
      </div>

      <div className="relative mb-12 group">
        <div className="w-48 h-48 rounded-full bg-linear-to-tr from-pink-400 to-purple-600 p-1 shadow-[0_0_50px_rgba(192,132,252,0.3)]">
          <div className="w-full h-full rounded-full bg-card-dark overflow-hidden">
            {/* tempat foto profil */}
            <div
              className="w-full h-full bg-cover bg-center scale-110"
              style={{
                backgroundImage:
                  "url('https://c4.wallpaperflare.com/wallpaper/236/691/651/anime-girls-sword-anime-warrior-wallpaper-preview.jpg')",
              }}
            ></div>
            <div className="w-full h-full flex items-center justify-center bg-gray-800 text-6xl">
              👓
            </div>
          </div>
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

        <div className="w-10 h-10 rounded-full bg-purple-400 flex items-center justify-center text-black shadow-[0_0_15px_rgba(192,132,252,0.5)]">
          <ArrowRight size={20} />
        </div>
      </div>
    </div>
  );
};

export default Clock;
