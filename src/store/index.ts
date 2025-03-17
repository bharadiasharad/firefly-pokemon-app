import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './pokemonReducer';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
