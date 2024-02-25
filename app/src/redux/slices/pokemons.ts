import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type TPokemonDetails = {
  id: number;
  name: string;
  abilities: string[];
  image: string;
};

type PokemonState = {
  list: TPokemonDetails[];
  current: TPokemonDetails | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  isFetching: boolean;
  error: string | null;
};

const initialState: PokemonState = {
  list: [],
  current: null,
  status: "idle",
  isFetching: false,
  error: null,
};

export const fetchPokemons = createAsyncThunk(
  "pokemons/fetchPokemons",
  async ({
    page,
    limit,
    search,
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    let url = `${import.meta.env.VITE_API_URL}pokemons`;
    if (page || limit || search) {
      url = `${url}?page=${page || ""}&limit=${limit || ""}&search=${
        search || ""
      }`;
    }
    const response = await axios.get(url);
    if (!response.data) {
      // error with status code
      throw new Error(response.statusText || "Error fetching pokemons");
    }
    return response.data;
  },
);

export const fetchPokemonByName = createAsyncThunk(
  "pokemons/fetchPokemonByName",
  async (name: string) => {
    const url = `${import.meta.env.VITE_API_URL}pokemons/${name}`;
    const response = await axios.get(url);
    if (!response.data) {
      throw new Error("Error fetching pokemon by name");
    }
    return response.data;
  },
);

const pokemonSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.status = "loading";
        state.isFetching = true;
        state.error = null;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.isFetching = false;
        state.list = action.payload.map((pokemon: TPokemonDetails) => ({
          id: pokemon.id,
          name: pokemon.name,
          abilities: pokemon.abilities,
          image: pokemon.image,
        }));
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.status = "failed";
        state.isFetching = false;
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(fetchPokemonByName.pending, (state) => {
        state.status = "loading";
        state.isFetching = true;
        state.error = null;
      })
      .addCase(fetchPokemonByName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isFetching = false;
        state.error = null;
        state.current = action.payload;
      })
      .addCase(fetchPokemonByName.rejected, (state, action) => {
        state.status = "failed";
        state.isFetching = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default pokemonSlice.reducer;
