import weatherClient from "../api/weatherApi";

export const getCurrentWeather = (city) =>
  weatherClient.get("weather", { params: { q: city } }).then((r) => r.data);
