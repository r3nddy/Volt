import axios from "axios";

const cryptoClient = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
  timeout: 10000,
});

export function getCryptoSnapshot() {
  return Promise.all([
    cryptoClient.get("/global"),
    cryptoClient.get("/coins/markets", {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 4,
        page: 1,
        sparkline: false,
        price_change_percentage: "24h",
      },
    }),
    cryptoClient.get("/coins/bitcoin/market_chart", {
      params: { vs_currency: "usd", days: 30 },
    }),
  ]).then(([global, markets, chart]) => ({
    global: global.data,
    markets: markets.data,
    chart: chart.data,
  }));
}

export default { getCryptoSnapshot };
