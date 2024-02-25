export type TPokemon = {
  name: string;
  url: string;
};

export interface IAPIGetPokemonsData {
  count: number;
  next: string | null;
  previous: string | null;
  results: TPokemon[];
}

export type TAPIGetPokemonsResponse = {
  data: IAPIGetPokemonsData;
}
