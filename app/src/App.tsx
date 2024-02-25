import { useState } from "react";
import { useDispatch } from "react-redux";
import { PokemonLogo } from "./assets";
import { Modal } from "./components/atoms";
import { Searcher } from "./components/molecules";
import { LazyContainer } from "./components/templates";
import { RootDispatch } from "./redux";
import { fetchPokemonByName } from "./redux/slices";

const App = function () {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch() as RootDispatch;

  const openPokemonDetail = (name: string) => {
    dispatch(fetchPokemonByName(name));
    setShowModal(true);
  };

  return (
    <section className="container mx-auto px-4 py-20 sm:px-8">
      <Modal isVisible={showModal} onDismiss={() => setShowModal(false)} />
      <PokemonLogo className="w-10 mb-10 sm:mx-auto sm:w-1/3" />
      <div className="my-2 flex sm:flex-row flex-col">
        <div className="flex flex-row flex-1">
          <a
            href={"/coaches"}
            className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded mr-4"
          >
            {"Entrenadores pokemon"}
          </a>
        </div>
      </div>
      <Searcher />
      <LazyContainer onPokemonPress={(name) => openPokemonDetail(name)} />
    </section>
  );
};

export default App;
