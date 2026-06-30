import axios from "axios";

const cities = [
  { name: "Cairo", lat: 30.0444, lon: 31.2357 },
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
  { name: "New York", lat: 40.7128, lon: -74.006 },
  { name: "Broken-Cairo", lon: 31.2357 },
];

async function weatherDashboard(cities) {
  const results = await Promise.allSettled(
    cities.map(async (city) => {
      let { data } = await axios.get("https://api.open-meteo.com/v1/forecast", {
        params: {
          latitude: city.lat,
          longitude: city.lon,
          current_weather: true,
        },
        timeout: 15000,
      });

      return data;
    }),
  );

  const output = results.map((result, i) => {
    if (result.status === "fulfilled") {
      const current = result.value.current_weather;
      return {
        name: cities[i].name,
        ok: true,
        temp: current.temperature,
        wind: current.windspeed,
        code: current.weathercode,
      };
    } else {
      return { name: cities[i].name, ok: false, error: result.reason.message };
    }
  });

  return output;
}

console.log(await weatherDashboard(cities));
