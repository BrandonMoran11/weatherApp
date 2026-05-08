import { Sun, CloudRain, Cloudy, CloudFog, CloudSnow } from "lucide-react";

export default function WeatherCard({ weatherData }) {
  const getBgImage = (weather) => {
    const condition = weather.toLowerCase();
    switch (condition) {
      case "clear":
        return "https://plus.unsplash.com/premium_photo-1727730047398-49766e915c1d?q=80&w=1812&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
      case "clouds":
        return "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1200&auto=format";
      case "rain":
        return "https://images.unsplash.com/photo-1428592953211-077101b2021b?w=1200&auto=format";
      case "thunderstorm":
        return "https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?w=1200&auto=format";
      case "snow":
        return "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=1200&auto=format";
      case "drizzle":
        return "https://images.unsplash.com/photo-1541919329513-35f7af297129?w=1200&auto=format";
      case "atmosphere":
        return "https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=1200&auto=format";
      default:
        return "https://plus.unsplash.com/premium_photo-1727730047398-49766e915c1d?q=80&w=1812&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    }
  };
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
    <div
      className="flex flex-row justify-between p-10 rounded-lg shadow-lg w-3/4 h-80 bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `url('${getBgImage(weatherData.weather[0].main)}')`,
      }}
    >
      {/* Overlay oscuro para legibilidad */}
      <div className="absolute inset-0 bg-black/40 rounded-lg" />
      <div className="flex flex-col items-start justify-end relative z-10">
        <article className="flex flex-row items-center space-x-0.5">
          <h2 className="text-lg md:text-2xl font-bold text-white">
            {weatherData.name},
          </h2>
          <p className="font-bold text-lg md:text-2xl text-white">
            {weatherData.sys.country}
          </p>
        </article>
        <p className="font-semibold text-white/80">
          {date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-white border-2 border-white/50 rounded-3xl px-2 py-1 mt-2">
          {weatherData.weather[0].main}
        </p>
      </div>
      <div className="flex flex-col justify-start md:justify-end relative z-10">
        <div className=" flex flex-row items-center gap-2">
          {getIcon(weatherData.weather[0].main)}
          <p className="text-white text-lg md:text-6xl">
            {weatherData.main.temp}°C
          </p>
        </div>
        <p className="text-white/70 font-semibold self-end">
          FeelsLike {weatherData.main.feels_like}°C
        </p>
      </div>
    </div>
  );
}
