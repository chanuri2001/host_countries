import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/auth';
import countriesReducer from '../features/countries/countries';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    countries: countriesReducer,
  },
});