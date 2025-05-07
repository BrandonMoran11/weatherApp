import { Droplets, Wind, Sunrise, Sunset, BarChart, Eye } from "lucide-react";
export default function WeatherDetails({ weatherData }) {
  const visibility = weatherData.visibility / 1000; // Convertir a km
  const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
  const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
  return (
    <div className="bg-white p-5 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Weather Details</h2>
      <ul className="space-y-2">
        <li className="flex flex-col gap-2 justify-between">
          <div className="flex flex-row items-center gap-4">
            <div className="bg-blue-100 p-2 rounded-4xl">
              <Droplets className="size-6 text-blue-500 " />
            </div>
            <div className="flex flex-col justify-between">
              <span className="text-gray-500 text-base font-semibold">
                Humidity
              </span>
              <span className="font-bold">{weatherData.main.humidity}%</span>
            </div>
          </div>
        </li>
        <li className="flex flex-col gap-2 justify-between">
          <div className="flex flex-row items-center gap-4">
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
          <div className="flex flex-row items-center gap-4">
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
          <div className="flex flex-row items-center gap-4">
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
          <div className="flex flex-row items-center gap-4">
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
          <div className="flex flex-row items-center gap-4">
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
