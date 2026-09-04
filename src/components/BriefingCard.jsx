import { useState } from "react";
import {
  X,
  Sparkles,
  RefreshCw,
  Cloud,
  Wind,
  Droplets,
  Thermometer,
} from "lucide-react";
import { useBriefing } from "../hooks/useBriefing";

const BriefingModal = ({
  open,
  onClose,
  data,
  briefing,
  briefingLoading,
  briefingError,
  onRefresh,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-card-dark border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-[fadeIn_0.2s_ease-out]">
        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl"></div>

        {/* Header */}
        <div className="relative flex items-center justify-between p-6 pb-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center">
              <Sparkles size={20} className="text-green-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">
                AI Weather Insight
              </h2>
              <p className="text-xs text-gray-500 font-mono">
                {data?.name
                  ? `${data.name} • ${Math.round(data.main.temp)}°C`
                  : "Memuat…"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="relative p-6">
          {/* Loading */}
          {briefingLoading && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-400/60 animate-pulse" />
                <span className="text-sm text-gray-500 font-mono">
                  Menyusun insight…
                </span>
              </div>
              <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
              <div className="h-4 w-5/6 rounded bg-white/10 animate-pulse" />
              <div className="h-4 w-2/3 rounded bg-white/10 animate-pulse" />
            </div>
          )}

          {/* Success */}
          {!briefingLoading && briefing && (
            <div className="space-y-5">
              {/* Quote */}
              <div className="relative">
                <span className="absolute -top-3 -left-1 text-5xl text-green-500/20 font-serif leading-none select-none">
                  "
                </span>
                <p className="text-base text-gray-200 leading-relaxed pt-4 pl-4">
                  {briefing}
                </p>
              </div>

              {/* Quick stats */}
              {data && (
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
                  <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/3">
                    <Thermometer size={16} className="text-green-400" />
                    <span className="text-xs text-gray-500">Suhu</span>
                    <span className="text-sm font-semibold text-white">
                      {Math.round(data.main.temp)}°C
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/3">
                    <Droplets size={16} className="text-green-400" />
                    <span className="text-xs text-gray-500">Lembap</span>
                    <span className="text-sm font-semibold text-white">
                      {data.main.humidity}%
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/3">
                    <Wind size={16} className="text-green-400" />
                    <span className="text-xs text-gray-500">Angin</span>
                    <span className="text-sm font-semibold text-white">
                      {data.wind.speed} m/s
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error */}
          {!briefingLoading && briefingError && (
            <div className="text-center py-6">
              <Cloud size={40} className="text-gray-600 mx-auto mb-3" />
              <p className="text-sm text-gray-400 mb-4">{briefingError}</p>
              <button
                onClick={onRefresh}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-500 text-white text-sm transition-colors shadow-lg shadow-green-500/20"
              >
                <RefreshCw size={14} />
                Coba lagi
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="relative px-6 pb-4 flex items-center justify-between">
          <span className="text-[10px] text-gray-600 font-mono uppercase tracking-wider">
            Powered by AI
          </span>
          {!briefingLoading && briefing && (
            <button
              onClick={onRefresh}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-green-400 transition-colors"
            >
              <RefreshCw size={12} />
              Refresh
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const BriefingCard = ({
  city,
  onCityChange,
  data,
  loading,
  error,
  onRetry,
}) => {
  const [input, setInput] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const {
    briefing,
    loading: briefingLoading,
    error: briefingError,
    refresh,
  } = useBriefing(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || trimmed === city) return;
    onCityChange(trimmed);
    setInput("");
  };

  const handleOpenModal = () => {
    if (data && !loading && !error) {
      setModalOpen(true);
    }
  };

  return (
    <>
      <div className="bg-card-dark p-5 rounded-3xl flex flex-col shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
        {/* Ambient glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>

        {/* Search input */}
        <form onSubmit={handleSubmit} className="flex gap-2 z-10">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Cari kota… (aktif: ${city})`}
            aria-label="Cari kota"
            className="flex-1 min-w-0 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-green-400/60 transition-colors"
          />
          <button
            type="submit"
            aria-label="Cari cuaca"
            className="px-3 py-2 rounded-xl bg-green-600 hover:bg-green-500 text-white transition-all duration-200 shadow-lg shadow-green-500/20 active:scale-95"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </form>

        {/* Divider */}
        <div className="h-px bg-white/5 my-4 z-10"></div>

        {/* Loading weather */}
        {loading && (
          <div className="space-y-3 z-10">
            <div className="h-4 w-20 rounded bg-white/10 animate-pulse" />
            <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
            <div className="h-4 w-3/4 rounded bg-white/10 animate-pulse" />
          </div>
        )}

        {/* Error weather */}
        {error && !loading && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 z-10">
            <p className="text-sm text-red-400">{error}</p>
            <button
              onClick={onRetry}
              className="mt-2 text-xs px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 transition-colors"
            >
              Coba lagi
            </button>
          </div>
        )}

        {/* Idle — no data */}
        {!loading && !error && !data && (
          <div className="flex items-center justify-center py-6 z-10">
            <p className="text-sm text-gray-500 text-center">
              Cari kota untuk melihat insight cuaca
            </p>
          </div>
        )}

        {/* Insight trigger button */}
        {!loading && !error && data && (
          <div className="z-10">
            <button
              onClick={handleOpenModal}
              className="group relative w-full py-4 rounded-2xl border border-dashed border-white/10 hover:border-green-500/40 bg-white/2 hover:bg-green-500/6 transition-all duration-300 cursor-pointer"
            >
              {/* Pulsing ring */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-green-500/0 group-hover:ring-green-500/20 animate-[pulse_3s_ease-in-out_infinite] transition-all duration-300"></div>

              <div className="flex items-center gap-4 px-2 justify-center">
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full bg-green-500/15 flex items-center justify-center group-hover:bg-green-500/25 transition-colors">
                    <Sparkles
                      size={20}
                      className="text-green-400 group-hover:text-green-300 transition-colors"
                    />
                  </div>
                  {briefing && (
                    <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 ring-2 ring-card-dark" />
                  )}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    Lihat AI Insight
                  </p>
                  <p className="text-xs text-gray-600 mt-0.5 font-mono">
                    {briefingLoading
                      ? "Menyusun…"
                      : briefing
                        ? "Siap"
                        : "Ketuk untuk melihat"}
                  </p>
                </div>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <BriefingModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        data={data}
        briefing={briefing}
        briefingLoading={briefingLoading}
        briefingError={briefingError}
        onRefresh={refresh}
      />
    </>
  );
};

export default BriefingCard;
