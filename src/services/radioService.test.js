import assert from "node:assert/strict";
import {
  fallbackRecommendation,
  parseRadioRecommendation,
} from "./radioRecommendation.js";

const selected = parseRadioRecommendation(
  '{"stationId":"love-yourself-justin-bieber","reason":"Lagu santai cocok untuk cuaca"}',
);
assert.equal(selected.station.id, "love-yourself-justin-bieber");
assert.equal(selected.reason, "Lagu santai cocok untuk cuaca");

const fenced = parseRadioRecommendation(
  '```json\n{"stationId":"lifting-dreams","reason":"Fokus stabil"}\n```',
);
assert.equal(fenced.station.id, "lifting-dreams");

const invalid = parseRadioRecommendation('{"stationId":"unknown"}');
assert.equal(invalid.station.id, fallbackRecommendation().station.id);

const rainy = fallbackRecommendation({ weather: [{ main: "Rain" }] }, 14);
assert.equal(rainy.station.id, "love-yourself-justin-bieber");

console.log("radioService self-check passed");
