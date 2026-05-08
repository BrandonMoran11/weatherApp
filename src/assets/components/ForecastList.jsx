import { CloudRain, Sun, Cloudy, CloudFog, CloudSnow } from "lucide-react";
export default function ForecastList({ forecastData }) {
  // La API devuelve datos cada 3 horas, debemos filtrar para obtener un pronóstico diario
  // Agrupamos por día y obtenemos un dato por día
  const dailyForecasts = forecastData.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = item;
    }
    return acc;
  }, {});

  // Convertir a array y limitar a 5 días
  const forecastItems = Object.values(dailyForecasts).slice(1, 6);

  const getIcon = (icon) => {
    switch (icon) {
      case "clear":
        return <Sun className="h-8 w-8 text-amber-500 dark:text-amber-400" />;
      case "clouds":
        return <Cloudy className="h-8 w-8 text-gray-500 dark:text-gray-400" />;
      case "rain":
        return (
          <CloudRain className="h-8 w-8 text-blue-500 dark:text-blue-400" />
        );
      case "thunderstorm":
        return (
          <CloudRain className="h-8 w-8 text-blue-500 dark:text-blue-400" />
        );
      case "snow":
        return (
          <CloudSnow className="h-8 w-8 text-blue-500 dark:text-blue-400" />
        );
      case "Atmosphere":
        return (
          <CloudFog className="h-8 w-8 text-gray-500 dark:text-gray-400" />
        );
      case "drizzle":
        return (
          <CloudFog className="h-8 w-8 text-gray-500 dark:text-gray-400" />
        );
      default:
        return <Sun className="h-8 w-8 text-amber-500 dark:text-amber-400" />;
    }
  };
  return (
    <div className=" p-4 rounded-lg w-3/4">
      <h2 className="text-xl font-bold mb-4">Forecast 5 days</h2>

      <div className="grid grid-cols-5 gap-8">
        {forecastItems.map((item, index) => {
          const date = new Date(item.dt * 1000);
          const dayName = date.toLocaleDateString("en-En", {
            weekday: "short",
          });

          return (
            <div
              key={index}
              className="flex flex-col items-center gap-3 py-6 rounded-lg border-2 border-gray-300 bg-white"
            >
              <span className="text-xl font-semibold">{dayName}</span>
              {getIcon(item.weather[0].main.toLowerCase())}
              <div className="mt-2 text-sm flex gap-2">
                <span className="font-medium text-gray-800">
                  {Math.round(item.main.temp_max)}°
                </span>
                <span className="text-gray-500">
                  {Math.round(item.main.temp_min)}°
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
