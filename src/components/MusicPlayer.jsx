import { useEffect, useRef, useState } from "react";
import { Pause, Play, Radio, RefreshCw, SkipForward } from "lucide-react";
import { useRadioRecommendation } from "../hooks/useRadioRecommendation";
import { RADIO_STATIONS, getRadioStation } from "../data/radioStations";

function loadYouTubeIframeApi() {
  if (typeof window === "undefined") return Promise.reject();
  if (window.YT?.Player) return Promise.resolve(window.YT);

  return new Promise((resolve) => {
    const existing = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      existing?.();
      resolve(window.YT);
    };

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  });
}

const MusicPlayer = ({ weatherData }) => {
  const { recommendation, loading, error, refresh } =
    useRadioRecommendation(weatherData);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [activeStationId, setActiveStationId] = useState(null);

  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const currentVideoIdRef = useRef(null);

  const recommendedStation = recommendation.station;
  const station = getRadioStation(activeStationId) ?? recommendedStation;
  const youtubeId = station?.youtubeId;

  // Inisialisasi YouTube Player SEKALI saja saat mount
  useEffect(() => {
    let playerInstance = null;
    let isMounted = true;

    loadYouTubeIframeApi().then((YT) => {
      if (!isMounted || !containerRef.current) return;

      playerInstance = new YT.Player(containerRef.current, {
        height: "1",
        width: "1",
        videoId: youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: () => {
            if (isMounted) {
              setIsReady(true);
              currentVideoIdRef.current = youtubeId;
            }
          },
          onStateChange: (e) => {
            if (!isMounted) return;
            // 1: PLAYING, 2: PAUSED, 0: ENDED, 3: BUFFERING
            if (e.data === 1) setIsPlaying(true);
            if (e.data === 2 || e.data === 0) setIsPlaying(false);
          },
          onError: (err) => {
            console.warn("YouTube Player error code:", err?.data);
            if (!isMounted) return;
            setHasError(true);
            setIsPlaying(false);
          },
        },
      });

      playerRef.current = playerInstance;
    });

    return () => {
      isMounted = false;
      try {
        playerInstance?.destroy?.();
      } catch (err) {
        void err;
      }
      playerRef.current = null;
      setIsReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update video saat youtubeId ganti
  useEffect(() => {
    if (!playerRef.current || !isReady || !youtubeId) return;
    if (currentVideoIdRef.current === youtubeId) return;

    currentVideoIdRef.current = youtubeId;

    try {
      if (isPlaying) {
        playerRef.current.loadVideoById(youtubeId);
      } else {
        playerRef.current.cueVideoById(youtubeId);
      }
    } catch (e) {
      console.error("Change video error:", e);
    }
  }, [youtubeId, isReady, isPlaying]);

  const togglePlayback = () => {
    if (!playerRef.current || !isReady) return;

    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        setHasError(false);
        playerRef.current.playVideo();
      }
    } catch (e) {
      console.error("Playback toggle error:", e);
      setHasError(true);
    }
  };

  const handleNext = () => {
    const currentIndex = RADIO_STATIONS.findIndex(
      ({ id }) => id === station.id,
    );
    const next = RADIO_STATIONS[(currentIndex + 1) % RADIO_STATIONS.length];
    setActiveStationId(next.id);
    setHasError(false);
  };

  return (
    <div className="bg-card-dark p-5 rounded-3xl h-44 shadow-lg flex flex-col justify-between relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-green-500/20 rounded-full blur-xl" />

      {/* YouTube Iframe Mount (1px invisible instead of hidden) */}
      <div
        style={{
          position: "absolute",
          top: -9999,
          left: -9999,
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <div ref={containerRef} />
      </div>

      <div className="relative min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Radio size={13} className="text-green-400" aria-hidden="true" />
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            AI Radio
          </h3>
          <span className="ml-auto text-[10px] font-mono text-green-400">
            {isPlaying ? "LIVE" : "READY"}
          </span>
        </div>
        <p className="text-md font-bold text-white truncate w-full">
          {loading ? "Memilih channel…" : station.name}
        </p>
        <p className="text-xs text-gray-400 truncate">{station.description}</p>
        <p className="text-[10px] text-gray-600 truncate mt-1">
          {error ??
            (hasError
              ? "Video diblokir copyright/embed oleh YouTube. Coba ganti lagu."
              : station.source)}
        </p>
      </div>

      <div className="relative flex items-center gap-3 mt-auto">
        <button
          onClick={togglePlayback}
          disabled={!isReady}
          aria-label={isPlaying ? "Jeda radio" : "Putar radio"}
          aria-pressed={isPlaying}
          className="p-3 rounded-full bg-green-400 hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed text-black transition-colors shadow-lg shadow-green-500/20"
        >
          {isPlaying ? (
            <Pause size={20} fill="currentColor" />
          ) : (
            <Play size={20} fill="currentColor" />
          )}
        </button>
        <button
          onClick={handleNext}
          aria-label="Ganti channel radio"
          className="p-2 rounded-full bg-[#27272a] hover:bg-[#3f3f46] text-gray-400 hover:text-white transition-colors"
        >
          <SkipForward size={18} />
        </button>
        <button
          onClick={refresh}
          aria-label="Refresh rekomendasi radio"
          className="p-2 rounded-full bg-[#27272a] hover:bg-[#3f3f46] text-gray-400 hover:text-white transition-colors"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        </button>
        {hasError && (
          <span className="text-[10px] text-red-400">Ganti lagu</span>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
