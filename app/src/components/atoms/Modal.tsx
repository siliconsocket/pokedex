import { PDFDownloadLink } from "@react-pdf/renderer";
import React from "react";
import { TPokemonDetails } from "../../types";
import { PokePDF } from "../templates";
import { RootState } from "../../redux";
import { useSelector } from "react-redux";

type TProps = {
  children?: React.ReactNode;
  isVisible?: boolean;
  onDismiss?: () => void;
};

const Modal: React.FC<TProps> = function ({ isVisible, onDismiss }) {
  const data: TPokemonDetails | null = useSelector(
    (state: RootState) => state.pokemon.current,
  );

  return isVisible && data?.id ? (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                {data.name.toUpperCase()}
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={onDismiss}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            <div className="relative p-6 flex-auto">
              <div className="flex justify-center">
                <img src={data.image} alt={data.name} className="w-32 h-32" />
              </div>
              <h4 className="text-lg font-semibold my-4">Abilities:</h4>
              <ul className="list-disc pl-5">
                {data.abilities.map((ability: string, index: number) => (
                  <li
                    key={index}
                    className="my-2 text-blueGray-500 text-lg leading-relaxed"
                  >
                    {ability}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onDismiss}
              >
                Cerrar
              </button>
              <PDFDownloadLink
                document={<PokePDF data={data} />}
                fileName={`${data.name}.pdf`}
              >
                {({ blob, url, loading, error }) => (
                  <button
                    type="button"
                    disabled={loading}
                    className={`${
                      loading
                        ? "bg-emerald-500 text-white opacity-50"
                        : "bg-emerald-500 text-white hover:bg-emerald-600"
                    } font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                  >
                    {loading ? "Cargando..." : "Descargar PDF"}
                  </button>
                )}
              </PDFDownloadLink>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-55 fixed inset-0 z-40 bg-black"></div>
    </>
  ) : null;
};

export default Modal;
