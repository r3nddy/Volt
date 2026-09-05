import assert from "node:assert/strict";
import { mapCryptoSnapshot } from "./cryptoService.js";

const result = mapCryptoSnapshot({
  global: {
    data: {
      total_market_cap: { usd: 2_000_000_000_000 },
      market_cap_change_percentage_24h_usd: -1.25,
      market_cap_percentage: { btc: 55, eth: 18 },
    },
  },
  markets: [
    {
      image: "https://example.com/btc.png",
      name: "Bitcoin",
      symbol: "btc",
      current_price: 100,
      price_change_percentage_24h: 2.5,
    },
  ],
  chart: {
    prices: [
      [1, 90],
      [2, 100],
    ],
  },
});

assert.equal(result.marketCapUSD, 2_000_000_000_000);
assert.equal(result.marketCapChange, -1.25);
assert.deepEqual(result.chartData, [90, 100]);
assert.equal(result.dominanceData[2].percentage, 27);
assert.equal(result.coinData[0].symbol, "BTC");
console.log("cryptoService self-check passed");
