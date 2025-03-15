import { configureStore } from '@reduxjs/toolkit';
import pokemon from './pokemonReducer';

const store = configureStore({
  reducer: {
    pokemon
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
