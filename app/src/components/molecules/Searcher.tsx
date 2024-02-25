import React, { useEffect, useState } from "react";
import { TPokemonDetails } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "../../redux";
import { fetchPokemons } from "../../redux/slices";
import { SearchBar } from "../atoms";

const PagerButtons = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [query, setQuery] = useState<string | undefined>();
  const [limit, setLimit] = useState<number | undefined>(10);

  const dispatch = useDispatch() as RootDispatch;

  const pokemonList: TPokemonDetails[] = useSelector(
    (state: RootState) => state.pokemon.list,
  );

  const pokemonsError = useSelector((state: RootState) => state.pokemon.error);

  const handleNext = () => {
    if (pokemonList.length > 0) {
      setCurrentPage(currentPage + 1);
      if (!limit) {
        setLimit(10);
      }
      return;
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      return;
    }
    if (!limit) {
      setLimit(10);
    }
    setCurrentPage(1);
  };

  const handleFetchAll = () => {
    setCurrentPage(1);
    setQuery(undefined);
    setLimit(undefined);
  };

  useEffect(() => {
    dispatch(fetchPokemons({ page: currentPage, limit, search: query }));
  }, [currentPage, limit, dispatch, query]);

  return (
    <>
      {pokemonsError && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <p>{pokemonsError}</p>
        </div>
      )}
      <SearchBar onChangeText={setQuery} />
      <div className="flex justify-between my-4">
        <button
          onClick={() => handleFetchAll()}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700"
        >
          Todos
        </button>
        <button
          onClick={() => handlePrevious()}
          disabled={currentPage === 1}
          className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-700"
          }`}
        >
          Anterior
        </button>
        <div>
          <p className="text-center text-gray-700">{`Página: ${currentPage}`}</p>
          <p className="text-center text-gray-700">{"Resultados por página"}</p>
          <input
            type="number"
            min="2"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="mx-2 border-2 border-gray-300 bg-white h-10 px-5 rounded text-sm focus:outline-none"
            placeholder="Resultados por página"
          />
        </div>
        <button
          onClick={() => handleNext()}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

export default PagerButtons;
