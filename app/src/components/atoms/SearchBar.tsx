import React from "react";

type TProps = {
  onChangeText: (text: string) => void;
};

const SearchBar: React.FC<TProps> = ({ onChangeText }) => {
  return (
    <div className="flex justify-center pt-2">
      <input
        type="text"
        className="form-input mt-1 mb-5 block w-full border-2 border-blue-500 bg-white h-12 px-4 mx-5 rounded-lg text-sm focus:outline-none"
        onChange={(e) => onChangeText(e.target.value)}
        placeholder="Buscar..."
      />
    </div>
  );
};

export default SearchBar;
