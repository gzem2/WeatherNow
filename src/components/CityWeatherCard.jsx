import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { updateCityWeather } from '@/redux/citiesSlice';
import { useDispatch } from 'react-redux';
import WeatherIcon from '@/components/WeatherIcon';

export default function CityWeatherCard({ city }) {
    const dispatch = useDispatch();
    
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const { lat, lon } = city;
                const CACHE_DURATION = 2 * 60 * 1000;
                const now = Date.now();
                if (city.weatherData && city.lastUpdated > now - CACHE_DURATION) {
                    setWeather({
                        temperature: city.weatherData.daily.temperature_2m_max[0],
                        weatherCode: city.weatherData.daily.weathercode[0]
                    });
                    return;
                }
                const res = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,weathercode,precipitation_sum,windspeed_10m_max&hourly=apparent_temperature&current_weather=true&hourly=relativehumidity_2m&timezone=auto`
                );
                if (!res.ok) throw new Error("Failed to fetch weather.");
                const data = await res.json();

                const todayIndex = 0;
                const temp = data.daily?.temperature_2m_max?.[todayIndex] ?? null;
                const code = data.daily?.weathercode?.[todayIndex] ?? 0;
                
                if (temp === null) {
                    console.error('Invalid temperature data:', data);
                    setWeather({
                        temperature: '--',
                        weatherCode: code
                    });
                } else {
                    setWeather({
                        temperature: temp,
                        weatherCode: code
                    });
                }

                dispatch(updateCityWeather({ 
                    cityName: city.name, 
                    weatherData: data 
                }));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city.lat, city.lon]);

    if (loading)
        return (
            <div className="p-4 m-2 bg-gray-100 rounded-lg text-gray-500">
                Loading {city.name}...
            </div>
        );

    if (error)
        return (
            <div className="p-4 m-2 bg-red-100 rounded-lg text-red-600">
                Error for {city.name}: {error}
            </div>
        );

    return (
        <Link to={`/city/${encodeURIComponent(city.name)}`}>
            <div className="p-4 m-2 bg-white rounded-xl shadow-md w-full max-w-xs text-center flex flex-col items-center space-y-2">
                <div className="text-5xl">
                    <WeatherIcon code={weather?.weatherCode ?? 0} size="lg" />
                </div>
                <div className="text-xl font-semibold px-2 break-words">
                    {city.name}
                </div>
                <div className="text-2xl">
                    {weather?.temperature ? Math.round(weather.temperature) : '--'}°C
                </div>
            </div>
        </Link>
    );
}
