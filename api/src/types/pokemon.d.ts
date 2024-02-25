type TAbility = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

type TForm = {
  name: string;
  url: string;
};

type TGameIndex = {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
};

type TVersionGroupDetail = {
  level_learned_at: number;
  move_learn_method: {
    name: string;
    url: string;
  };
  version_group: {
    name: string;
    url: string;
  };
};

type TSprites = {
  front_default: string;
  front_shiny: string;
  front_female: string | null;
  front_shiny_female: string | null;
  back_default: string;
  back_shiny: string;
  back_female: string | null;
  back_shiny_female: string | null;
};

type TMove = {
  move: {
    name: string;
    url: string;
  };
  version_group_details: TVersionGroupDetail[];
};

type TPokemonDetails = {
  id: number;
  name: string;
  abilities: TAbility[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  forms: TForm[];
  game_indices: TGameIndex[];
  height: number;
  sprites: TSprites;
  is_default: boolean;
  location_area_encounters: string;
  moves: TMove[];
};

export type TSinglePokemon = {
  data: TPokemonDetails;
}
