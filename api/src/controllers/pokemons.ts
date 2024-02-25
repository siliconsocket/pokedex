import axios from "axios";
import { Request, Response } from "express";
import { TAPIGetPokemonsResponse, TPokemon, TSinglePokemon } from "../types";

const getAPIURL = ({ limit, offset }: { limit: number; offset?: number }) => {
  let url = `${process.env.BASE_URL}pokemon?limit=${limit}&offset=${offset}`;
  if (!offset && limit) {
    url = `${process.env.BASE_URL}pokemon?limit=${limit}`;
  }
  return url;
};

//TODO: optimizar con redis para cachear los resultados
const fetchAllPokemons = async (): Promise<TPokemon[]> => {
  const maxPokemonLimitResponse: TAPIGetPokemonsResponse = await axios.get(
    getAPIURL({ limit: 1 }),
  );
  const totalCount = maxPokemonLimitResponse.data.count;
  // Realiza la llamada con el total de pokemons.
  const response: TAPIGetPokemonsResponse = await axios.get(
    getAPIURL({ limit: totalCount }),
  );
  // Ordena los pokemons alfabéticamente
  return response.data.results.sort((a, b) => a.name.localeCompare(b.name));
};

// Obtener pokemons con paginación
export const getPokemons = async (req: Request, res: Response) => {
  try {
    // Obtener page y limit de la query como números
    const pageParam = Number(req.query.page);
    const limitParam = Number(req.query.limit);
    const search: string | undefined = req.query.search as string | undefined;
    let pokemons: TPokemon[] = [];

    // Validar que page y limit sean números o undefined para continuar
    if (
      (req.query.page && isNaN(pageParam)) ||
      (req.query.limit && isNaN(limitParam))
    ) {
      // Si page o limit no son números, devuelve un error 400.
      return res.status(400).send("Page and limit must be numbers");
    }

    const page = req.query.page ? pageParam : undefined;
    const limit = req.query.limit ? limitParam : undefined;
    let offset = 0;

    if (page && limit) {
      offset = (page - 1) * limit;
    }

    if (search) {
      pokemons = await fetchAllPokemons();
      pokemons = pokemons.filter((pokemon) => pokemon.name.includes(search));

      // límites y paginación con todos los pokemons disponibles
      if (limitParam) {
        pokemons = pokemons.slice(offset, offset + limitParam);
      }

      if (pokemons.length === 0) {
        return res.status(404).send("No pokemons found");
      }
      return res.json(pokemons);
    }

    if (page && limit) {
      // Si se especifican page y limit, realiza la llamada con esos valores.
      // Validar que page y limit sean números o undefined
      const response: TAPIGetPokemonsResponse = await axios.get(
        getAPIURL({ limit, offset }),
      );
      pokemons = response.data.results;
    } else if (!page && limit) {
      // Si no se especifica page pero sí limit, realiza la llamada con limit y offset 0.
      const response: TAPIGetPokemonsResponse = await axios.get(
        getAPIURL({ limit, offset }),
      );
      pokemons = response.data.results;
    } else {
      pokemons = await fetchAllPokemons();
    }

    if (pokemons.length === 0) {
      return res.status(404).send("No pokemons found");
    }

    // Ordena los pokemons alfabéticamente
    pokemons.sort((a, b) => a.name.localeCompare(b.name));

    // Devuelve la lista de pokemons
    res.json(pokemons);
  } catch (error) {
    // Si hay un error, devuelve un error 500.
    res.status(500).send(error);
  }
};

// Obtener pokemon por nombre
export const getPokemonByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const response: TSinglePokemon = await axios.get(
      `${process.env.BASE_URL}pokemon/${name}`,
    );

    const { data } = response;

    const pokemonDetails = {
      id: data.id,
      name: data.name,
      abilities: data.abilities.map((ability) => ability.ability.name),
      image: data.sprites.front_default, // imagen frontal del pokemon
    };

    res.json(pokemonDetails);
  } catch (error) {
    res.status(404).send("Pokemon not found");
  }
};
