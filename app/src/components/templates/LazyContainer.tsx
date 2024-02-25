import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { TPokemonDetails } from "../../types";
import { PokemonItemList } from "../atoms";
import { LazyPokemon } from "../molecules";

type TLazyContainerProps = {
  onPokemonPress: (name: string) => void;
};

const LazyContainer: React.FC<TLazyContainerProps> = ({ onPokemonPress }) => {
  const pokemonList: TPokemonDetails[] = useSelector(
    (state: RootState) => state.pokemon.list,
  );

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {pokemonList.map((pokemon, index) => (
          <LazyPokemon key={`${index}-pokemon-item`}>
            <PokemonItemList
              data={pokemon}
              onClick={() => onPokemonPress(pokemon.name)}
            />
          </LazyPokemon>
        ))}
      </div>
    </>
  );
};

export default LazyContainer;
