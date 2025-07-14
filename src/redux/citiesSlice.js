import { createSlice } from '@reduxjs/toolkit';

const stored = localStorage.getItem("cities");
const initialState = {
    list: stored ? JSON.parse(stored) : [
        { name: "London", lat: 51.5, lon: -0.12 },
        { name: "Tokyo", lat: 35.6, lon: 139.7 }
    ],
    lastUpdated: JSON.parse(localStorage.getItem("weatherCacheTimestamp")) || {}
};

const citiesSlice = createSlice({
    name: "cities",
    initialState,
    reducers: {
        addCity(state, action) {
            const newCity = action.payload;
            const exists = state.list.some(
                (c) => c.name.toLowerCase() === newCity.name.toLowerCase()
            );
            if (!exists) {
                state.list.push(newCity);
                localStorage.setItem("cities", JSON.stringify(state.list));
            }
        },
        removeCity(state, action) {
            state.list = state.list.filter(c => c.name !== action.payload.name);
            localStorage.setItem("cities", JSON.stringify(state.list));
        },
        updateCityWeather(state, action) {
            const { cityName, weatherData } = action.payload;
            const city = state.list.find(c => c.name === cityName);
            if (city) {
                city.weatherData = weatherData;
                city.lastUpdated = Date.now();
                localStorage.setItem("cities", JSON.stringify(state.list));
                localStorage.setItem('weatherCacheTimestamp', JSON.stringify({
                    ...state.lastUpdated,
                    [city.name]: Date.now()
                }));
            }
        }
    }
});

export const { addCity, removeCity, updateCityWeather } = citiesSlice.actions;
export default citiesSlice.reducer;
