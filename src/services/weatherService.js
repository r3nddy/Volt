import weatherClient from "../api/weatherApi";

export const getCurrentWeather = async (city) => {
  try {
    const response = await weatherClient.get("weather", {
      params: { q: city },
    });

    console.log("API Data:", response.data);
    return response.data;
  } catch (err) {
    console.error("gagal ambil data cuaca", err.response?.data || err.message);
    throw err;
  }
};
