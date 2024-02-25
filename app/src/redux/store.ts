import { configureStore } from "@reduxjs/toolkit";
import { coachesSlice, pokemonSlice } from "./slices/";

export const store = configureStore({
  reducer: {
    pokemon: pokemonSlice,
    coaches: coachesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
