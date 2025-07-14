import { configureStore } from '@reduxjs/toolkit';
import citiesReducer from './citiesSlice';

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
  },
});
