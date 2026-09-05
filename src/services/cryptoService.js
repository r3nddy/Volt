const finiteNumber = (value, fallback = 0) =>
  Number.isFinite(Number(value)) ? Number(value) : fallback;

const formatCoin = (coin) => ({
  iconUrl: typeof coin.image === "string" ? coin.image : "",
  name: typeof coin.name === "string" ? coin.name : "Unknown",
  symbol: typeof coin.symbol === "string" ? coin.symbol.toUpperCase() : "—",
  price: finiteNumber(coin.current_price),
  change: finiteNumber(coin.price_change_percentage_24h),
});

export function mapCryptoSnapshot({ global, markets, chart }) {
  const percentages = global?.data?.market_cap_percentage ?? {};
  const bitcoin = Math.max(0, finiteNumber(percentages.btc));
  const ethereum = Math.max(0, finiteNumber(percentages.eth));
  const other = Math.max(0, 100 - bitcoin - ethereum);
  const prices = Array.isArray(chart?.prices) ? chart.prices : [];
  const sampleSize = Math.max(1, Math.ceil(prices.length / 30));

  return {
    marketCapUSD: finiteNumber(global?.data?.total_market_cap?.usd),
    marketCapChange: finiteNumber(
      global?.data?.market_cap_change_percentage_24h_usd,
    ),
    chartData: prices
      .filter((_, index) => index % sampleSize === 0)
      .map(([, price]) => finiteNumber(price))
      .filter((price) => price > 0),
    dominanceData: [
      { name: "Bitcoin", percentage: bitcoin, color: "bg-orange-400" },
      { name: "Ethereum", percentage: ethereum, color: "bg-violet-400" },
      { name: "Other", percentage: other, color: "bg-slate-500" },
    ],
    coinData: Array.isArray(markets) ? markets.map(formatCoin) : [],
  };
}

export default { mapCryptoSnapshot };
