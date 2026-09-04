import { Lightbulb, RefreshCw } from "lucide-react";
import { useTrivia } from "../hooks/useTrivia";

const TriviaCard = () => {
  const { trivia, loading, error, refresh } = useTrivia();

  return (
    <div className="bg-card-dark p-5 rounded-3xl shadow-lg relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
      {/* Glow */}
      <div className="absolute -top-16 -right-16 w-32 h-32 bg-amber-400/5 rounded-full blur-2xl"></div>

      {/* Header */}
      <div className="flex items-center gap-2.5 mb-3 relative z-10">
        <div className="w-8 h-8 rounded-lg bg-amber-400/15 flex items-center justify-center">
          <Lightbulb size={16} className="text-amber-400" />
        </div>
        <span className="text-sm font-semibold text-gray-300">AI Fun Fact</span>

        {/* Refresh button */}
        <button
          onClick={refresh}
          disabled={loading}
          className="ml-auto p-1.5 rounded-lg hover:bg-white/5 text-gray-600 hover:text-gray-400 transition-colors disabled:opacity-30"
          title="Refresh trivia"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Body */}
      <div className="relative z-10">
        {/* Loading */}
        {loading && (
          <div className="space-y-2">
            <div className="h-3 w-full rounded bg-white/10 animate-pulse" />
            <div className="h-3 w-3/4 rounded bg-white/10 animate-pulse" />
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <p className="text-sm text-red-400/80">{error}</p>
        )}

        {/* Trivia */}
        {trivia && !loading && !error && (
          <p className="text-sm text-gray-400 leading-relaxed">
            <span className="text-amber-400/80 font-medium">
              Tahukah kamu?{" "}
            </span>
            {trivia}
          </p>
        )}
      </div>
    </div>
  );
};

export default TriviaCard;
