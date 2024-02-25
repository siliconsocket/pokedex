import React from "react";
import PokeBallLogo from "../../assets/PokeBallLogo";
import { TPokemonDetails } from "../../types";

export type TPokemonItemListProps = {
  data: TPokemonDetails;
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
};

const PokemonItemList: React.FC<TPokemonItemListProps> = ({
  data,
  onClick,
}) => {
  return (
    <a href="#" onClick={onClick}>
      <div className="p-4 m-2 bg-gray-200 rounded flex flex-row shadow shadow-red-500">
        <PokeBallLogo width={33} height={33} />
        <h2 className="text-lg flex-1 pl-1">{data.name}</h2>
      </div>
    </a>
  );
};

export default PokemonItemList;
