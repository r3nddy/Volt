import { useId } from "react";
import { RefreshCw } from "lucide-react";

const formatMarketCap = (value) => {
  if (value >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
  if (value >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
  if (value >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
  return value.toLocaleString("en-US");
};

const formatPrice = (value) =>
  new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

const Change = ({ value }) => (
  <span className={value >= 0 ? "text-green-400" : "text-red-400"}>
    {value >= 0 ? "+" : ""}
    {value.toFixed(2)}%
  </span>
);

const SparkLineChart = ({ data }) => {
  const gradientId = `crypto-sparkline-${useId().replace(/:/g, "")}`;
  if (!data || data.length < 2) return null;

  const width = 320;
  const height = 48;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-12 w-full overflow-visible text-green-400"
      role="img"
      aria-label="Grafik perubahan market Bitcoin selama 30 hari"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={`${points} ${width},${height} 0,${height}`}
        fill={`url(#${gradientId})`}
        stroke="none"
      />
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

const LoadingState = () => (
  <div className="space-y-3" aria-label="Memuat data crypto" role="status">
    <div className="h-3 w-28 animate-pulse rounded bg-white/10" />
    <div className="h-7 w-36 animate-pulse rounded bg-white/10" />
    <div className="h-12 w-full animate-pulse rounded bg-white/5" />
    <div className="grid grid-cols-2 gap-2">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="h-7 animate-pulse rounded bg-white/5" />
      ))}
    </div>
  </div>
);

const CryptoStatsCard = ({ data, loading, error, onRetry }) => {
  return (
    <div className="relative h-64 min-h-64 shrink-0 overflow-hidden rounded-3xl bg-card-dark p-4 shadow-lg transition-transform duration-300 hover:scale-[1.05]">
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-green-500/10 blur-3xl" />

      {loading && <LoadingState />}

      {!loading && error && (
        <div className="flex h-full flex-col items-center justify-center text-center">
          <p className="mb-3 text-sm text-red-400">{error}</p>
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-3 py-2 text-sm text-white transition-colors hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <RefreshCw size={14} />
            Coba lagi
          </button>
        </div>
      )}

      {!loading && !error && data && (
        <div className="relative space-y-2">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] font-medium text-gray-500">
                Crypto market cap
              </p>
              <div className="mt-0.5 flex items-baseline gap-1.5">
                <span className="text-2xl font-bold tracking-tight text-white">
                  {formatMarketCap(data.marketCapUSD)}
                </span>
                <span className="text-[10px] font-medium text-gray-500">
                  USD
                </span>
              </div>
            </div>
            <p className="text-[10px] font-semibold">
              <Change value={data.marketCapChange} />
            </p>
          </div>

          <div className="-mx-1" aria-label="Tren market 30 hari">
            <SparkLineChart data={data.chartData} />
          </div>

          <div className="space-y-1 border-t border-white/5 pt-2">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-medium text-gray-500">
                Market dominance
              </p>
              <div className="flex gap-2 text-[9px] text-gray-400">
                {data.dominanceData.map((item) => (
                  <span key={item.name} className="flex items-center gap-1">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${item.color}`}
                    />
                    {item.name} {item.percentage.toFixed(0)}%
                  </span>
                ))}
              </div>
            </div>
            <div className="flex h-1.5 w-full gap-0.5 overflow-hidden rounded-full bg-white/5">
              {data.dominanceData.map((item) => (
                <div
                  key={item.name}
                  className={`h-full ${item.color}`}
                  style={{ width: `${item.percentage}%` }}
                  title={`${item.name}: ${item.percentage.toFixed(1)}%`}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-3 gap-y-1 border-t border-white/5 pt-2">
            {data.coinData.map((coin) => (
              <div
                key={coin.symbol}
                className="flex min-w-0 items-center justify-between gap-1"
              >
                <div className="flex min-w-0 items-center gap-1.5">
                  {coin.iconUrl ? (
                    <img
                      src={coin.iconUrl}
                      alt={`${coin.name} icon`}
                      className="h-5 w-5 shrink-0 rounded-full"
                    />
                  ) : (
                    <span
                      className="h-5 w-5 shrink-0 rounded-full bg-white/10"
                      aria-hidden="true"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-semibold text-gray-200">
                      {coin.symbol}
                    </p>
                    <p className="truncate text-[9px] text-gray-600">
                      {coin.name}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[9px] font-semibold text-gray-300">
                    {formatPrice(coin.price)}
                  </p>
                  <p className="text-[9px] font-medium">
                    <Change value={coin.change} />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoStatsCard;
