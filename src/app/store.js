import { configureStore } from '@reduxjs/toolkit';
import tournaReducer from '../features/counter/tournaSlice';

export const store = configureStore({
  reducer: {
    tourna: tournaReducer,
  },
});
