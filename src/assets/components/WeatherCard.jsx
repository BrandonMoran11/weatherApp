import { Sun, CloudRain, Cloudy, CloudFog, CloudSnow } from "lucide-react";

export default function WeatherCard({ weatherData }) {
  const date = new Date();

  const getIcon = (weather) => {
    const condition = weather.toLowerCase();
    switch (condition) {
      case "clear":
        return <Sun className="size-10 md:size-19 text-amber-500" />;
      case "clouds":
        return <Cloudy className="size-10 md:size-19 text-gray-500" />;
      case "rain":
        return <CloudRain className="size-10 md:size-19 text-blue-500" />;
      case "thunderstorm":
        return <CloudRain className="size-10 md:size-19 text-blue-500" />;
      case "snow":
        return <CloudSnow className="size-10 md:size-19 text-blue-500" />;
      case "atmosphere":
        return <CloudFog className="size-10 md:size-19 text-gray-500" />;
      case "drizzle":
        return <CloudRain className="size-10 md:size-19 text-blue-500" />;
      default:
        return <Sun className="size-10 md:size-19 text-amber-500" />;
    }
  };

  return (
    <div className=" flex flex-row justify-between bg-white px-10 py-5 rounded-lg shadow-lg">
      <div className="flex flex-col items-start">
        <article className="flex flex-row items-center space-x-0.5">
          <h2 className=" text-lg md:text-2xl font-bold">
            {weatherData.name},
          </h2>
          <p className="font-bold text-lg md:text-2xl">
            {weatherData.sys.country}
          </p>
        </article>
        <p className="font-semibold text-gray-600">
          {date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-gray-600 border-2 border-gray-300 rounded-3xl px-2 py-1 mt-2">
          {weatherData.weather[0].main}
        </p>
      </div>
      <div className="flex flex-col justify-start md:justify-center">
        <div className=" flex flex-row items-center gap-2">
          {getIcon(weatherData.weather[0].main)}
          <p className="text-gray-800 text-lg md:text-6xl  ">
            {weatherData.main.temp}°C
          </p>
        </div>
        <p className="text-gray-500 font-semibold self-end">
          FeelsLike {weatherData.main.feels_like}°C
        </p>
      </div>
    </div>
  );
}
