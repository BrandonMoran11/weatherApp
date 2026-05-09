import { Droplets, Wind, Sunrise, Sunset, BarChart, Eye } from "lucide-react";
export default function WeatherDetails({ weatherData }) {
  const visibility = weatherData.visibility / 1000;
  const formatCityTime = (unixUtc, timezoneOffsetSeconds) => {
    const utcMs = unixUtc * 1000 + timezoneOffsetSeconds * 1000;
    const date = new Date(utcMs);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
    const displayHours = (hours % 12 || 12).toString().padStart(2, "0");
    return `${displayHours}:${minutes} ${period}`;
  };

  const sunrise = formatCityTime(weatherData.sys.sunrise, weatherData.timezone);
  const sunset = formatCityTime(weatherData.sys.sunset, weatherData.timezone);
  return (
    <div className="p-5 rounded-lg w-full lg:w-3/4">
      <h2 className="text-xl font-bold mb-4">Weather Details</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-10">
        <li className="flex flex-col gap-2 justify-between">
          <div className="flex flex-row items-center gap-4 border-2 border-gray-300 rounded-3xl p-4 md:p-8 bg-white text-xl md:text-3xl">
            <div className="bg-blue-100 p-2 rounded-4xl">
              <Droplets className="size-10 text-blue-500 " />
            </div>
            <div className="flex flex-col justify-between">
              <span className="text-gray-500 text-base font-semibold">
                Humidity:
              </span>
              <span className="font-bold">{weatherData.main.humidity}%</span>
            </div>
          </div>
        </li>
        <li className="flex flex-col gap-2 justify-between">
          <div className="flex flex-row items-center gap-4 border-2 border-gray-300 rounded-3xl p-4 md:p-8 bg-white text-xl md:text-3xl">
            <div className="bg-green-200 p-2 rounded-4xl">
              <Wind className="size-6 text-green-600" />
            </div>
            <div className="flex flex-col justify-between">
              <span className="text-gray-500 text-base font-semibold">
                Wind Speed:
              </span>
              <span className="font-bold">{weatherData.wind.speed} km/h</span>
            </div>
          </div>
        </li>
        <li className="flex flex-col gap-2 justify-between">
          <div className="flex flex-row items-center gap-4 border-2 border-gray-300 rounded-3xl p-4 md:p-8 bg-white text-xl md:text-3xl">
            <div className="bg-cyan-100 p-2 rounded-4xl">
              <BarChart className="size-6 text-cyan-600" />
            </div>
            <div className="flex flex-col justify-between">
              <span className="text-gray-500 text-base font-semibold">
                Pressure:
              </span>
              <span className="font-bold">{weatherData.main.pressure} hPa</span>
            </div>
          </div>
        </li>
        <li className="flex flex-col gap-2 justify-between">
          <div className="flex flex-row items-center gap-4 border-2 border-gray-300 rounded-3xl p-4 md:p-8 bg-white text-xl md:text-3xl">
            <div className="bg-indigo-200 p-2 rounded-4xl">
              <Eye className="size-6 text-indigo-500" />
            </div>
            <div className="flex flex-col justify-between">
              <span className="text-gray-500 text-base font-semibold">
                Visibility:
              </span>
              <span className="font-bold">{visibility} km</span>
            </div>
          </div>
        </li>
        <li className="flex flex-col gap-2 justify-between">
          <div className="flex flex-row items-center gap-4 border-2 border-gray-300 rounded-3xl p-4 md:p-8 bg-white text-xl md:text-3xl">
            <div className="bg-amber-100 p-2 rounded-4xl">
              <Sunrise className="size-6 text-amber-500" />
            </div>
            <div className="flex flex-col justify-between">
              <span className="text-gray-500 text-base font-semibold">
                Sunrise:
              </span>
              <span className="font-bold">{sunrise}</span>
            </div>
          </div>
        </li>
        <li className="flex flex-col gap-2 justify-between">
          <div className="flex flex-row items-center gap-4 border-2 border-gray-300 rounded-3xl p-4 md:p-8 bg-white text-xl md:text-3xl">
            <div className="bg-orange-200 p-2 rounded-4xl">
              <Sunset className="size-6 text-orange-500" />
            </div>
            <div className="flex flex-col justify-between">
              <span className="text-gray-500 text-base font-semibold">
                Sunset:
              </span>
              <span className="font-bold">{sunset}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
