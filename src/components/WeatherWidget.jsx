import { useEffect, useState } from "react";
import { WMO_MAP } from "./wmo";

export default function WeatherWidget({ lat = 52.52, lon = 13.41 }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}&longitude=${lon}` +
      `&daily=weather_code` +
      `&hourly=temperature_2m,apparent_temperature,precipitation_probability` +
      `&timezone=Europe%2FLondon`;

    fetch(url)
      .then((r) => r.json())
      .then(setData)
      .catch(console.error);
  }, [lat, lon]);

  if (!data) return <div>Loading…</div>;

  const codeToday = data.daily.weather_code[0];
  const weather = WMO_MAP[codeToday] ?? {
    text: `Unknown (${codeToday})`,
    emoji: "❓",
  };

  return (
    <div>
      <h3>
        Today's weather: {weather.emoji} {weather.text}
      </h3>
      <p>Current temperature: {data.hourly.temperature_2m[0]} °C</p>
      <p>
        Precipitation probability: {data.hourly.precipitation_probability[0]}%
      </p>
    </div>
  );
}
