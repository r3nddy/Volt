import { SkipBack, Pause, Play, SkipForward } from "lucide-react";
import { useState } from "react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="bg-card-dark p-6 rounded-3xl h-44 shadow-lg flex flex-col justify-between relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl"></div>

      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
          Now Playing
        </h3>
        <p className="text-md font-bold text-white truncate w-full">
          Lofi Rainy Day
        </p>
        <p className="text-sm text-gray-400">Lofi girl</p>
      </div>

      <div className="flex items-center gap-4 mt-auto">
        <button className="p-2 rounded-full bg-[#27272a] hover:bg-[#3f3f46] transition-colors text-gray-400 hover:text-white">
          <SkipBack size={18} />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-3 rounded-full bg-purple-400 hover:bg-purple-500 text-black transition-colors shadow-lg shadow-purple-500/20"
        >
          {isPlaying ? (
            <Pause size={20} fill="currentColor" />
          ) : (
            <Play size={20} fill="currentColor" />
          )}
        </button>
        <button className="p-2 rounded-full bg-[#27272a] hover:bg-[#3f3f46] transition-colors text-gray-400 hover:text-white">
          <SkipForward size={18} />
        </button>
      </div>
    </div>
  );
};

export default MusicPlayer;
