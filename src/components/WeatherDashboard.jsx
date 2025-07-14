import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import CityWeatherCard from '@/components/CityWeatherCard';
import { addCity, removeCity } from '@/redux/citiesSlice';

export default function WeatherDashboard() {
    const cities = useSelector((state) => state.cities.list);
    const dispatch = useDispatch();

    const [inputCity, setInputCity] = useState('');

    const cityToCoords = async (cityName) => {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(cityName)}&format=json&limit=1`,
            {
                headers: {
                    "User-Agent": "WeatherNow/1.0"
                }
            }
        );
        const data = await res.json();
        if (!data.length) throw new Error("City not found");
        return {
            name: data[0].name,
            lat: parseFloat(data[0].lat),
            lon: parseFloat(data[0].lon)
        };
    };

    
    const handleAddCity = async (input) => {
        try {
            const city = await cityToCoords(input);
            dispatch(addCity(city));
        } catch (err) {
            console.error("Geocode failed", err);
        }
    };

    return (
        <div className="p-4">
            <div className="mb-4 flex gap-2 justify-center">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (inputCity.trim() === "") return;
                        handleAddCity(inputCity);
                        setInputCity("");
                    }}
                    className="mb-4 flex gap-2 justify-center"
                >
                    <input
                        type="text"
                        placeholder="Add city"
                        value={inputCity}
                        onChange={(e) => setInputCity(e.target.value)}
                        className="border rounded px-3 py-1 flex-grow max-w-xs"
                    />
                    <button
                        onClick={() => {
                            handleAddCity(inputCity);
                            setInputCity("");
                        }}
                        className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
                    >
                        Add
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {cities.map((city, index) => (
                    <div key={city + index} className="relative">
                        <CityWeatherCard city={city} />
                        <button
                            onClick={() => dispatch(removeCity(city))}
                            className="absolute top-1 right-1 text-red-600 hover:text-red-800 font-bold"
                            aria-label={`Remove ${city}`}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
