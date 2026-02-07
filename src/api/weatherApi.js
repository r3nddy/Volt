import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const weatherClient = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: "metric",
    lang: "id",
  },
});

export default weatherClient;
