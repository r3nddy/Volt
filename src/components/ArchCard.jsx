const ArchCard = () => {
  return (
    <div className="bg-card-dark p-6 rounded-3xl flex-1 flex flex-col shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
      <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-green-500 via-emerald-500 to-teal-500 opacity-50"></div>

      <div className="flex items-center gap-2 mb-6 bg-[#27272a] w-fit px-3 py-1 rounded-full">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-xs font-mono text-gray-300">neofetch.sh</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="w-20 h-20 flex items-center justify-center">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-full h-full text-sky-300"
          >
            <path d="M12 2L2 19h20L12 2zm1 16h-2v-2h2v2zm0-4h-2V8h2v6z" />
            {/* gambar tiruan logo arch */}
            <path
              d="M12 4.5L18 19H6L12 4.5Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>

        <div className="flex flex-col gap-1 font-mono text-xs sm:text-sm text-gray-400">
          <div className="flex">
            <span className="w-12 text-sky-300">OS</span>:
            <span className="text-gray-200"> Arch Linux</span>
          </div>
          <div className="flex">
            <span className="w-12 text-violet-300">WM</span> :
            <span className="text-gray-200">Hyprland</span>
          </div>
          <div className="flex">
            <span className="w-12 text-amber-300">USER</span> :{" "}
            <span className="text-gray-200">Rendy</span>
          </div>
          <div className="flex">
            <span className="w-12 text-emerald-300">UP</span> :{" "}
            <span className="text-gray-200">6 hours, 9 mins</span>
          </div>
        </div>
      </div>
      {/* Pallet warna */}
      <div className="mt-auto pt-4 flex gap-2">
        {[
          "bg-[#0a0a0a]",
          "bg-[#56BF8C]",
          "bg-[#3da06e]",
          "bg-[#2d7a52]",
          "bg-[#a0f0c8]",
          "bg-[#e0f5e9]",
          "bg-[#ffffff]",
          "bg-[#cccccc]",
        ].map((color, i) => (
          <div key={i} className={`${color} w-4 h-4 rounded-full`}></div>
        ))}
      </div>
    </div>
  );
};

export default ArchCard;
