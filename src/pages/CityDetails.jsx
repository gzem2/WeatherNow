import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import WeatherIcon from '@/components/WeatherIcon';

export default function CityDetails() {
    const navigate = useNavigate();
    const { cityName } = useParams();
    const decodedCityName = decodeURIComponent(cityName);
    
    const city = useSelector(state => 
        state.cities.list.find(c => c.name === decodedCityName)
    );

    if (!city) return <div>City not found</div>;
    if (!city.weatherData) return <div>Loading weather data...</div>;

    const { current_weather, daily, hourly } = city.weatherData;

    const now = new Date();
    const currentHour = now.getHours();
    
    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">{decodedCityName}</h1>
            
            <div className="flex items-center gap-4 mb-6">
                <WeatherIcon code={daily.weathercode[0]} size="lg" />
                <span className="text-4xl">{Math.round(daily.temperature_2m_max[0])}°C</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500">Humidity</p>
                    <p className="font-medium">{hourly.relativehumidity_2m[0]}%</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500">Wind Speed</p>
                    <p className="font-medium">{current_weather.windspeed} km/h</p>
                </div>

                <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500">Feels Like</p>
                    <p className="font-medium">{Math.round(hourly.apparent_temperature[currentHour])}°C</p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500">Precipitation</p>
                    <p className="font-medium">{daily.precipitation_sum[0]} mm</p>
                </div>
            </div>
            <div>
                <button onClick={() => navigate(-1)}>← Back</button>
            </div>
            
        </div>
    );
}
