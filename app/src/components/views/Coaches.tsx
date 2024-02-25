import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootDispatch, RootState } from "../../redux";
import {
  addCoach,
  deleteCoach,
  fetchAllCoaches,
  setCurrentCoach,
  updateCoach,
} from "../../redux/slices";
import { ModalForm } from "../atoms";
import { TCoach } from "../../types";

const CoachesList = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch() as RootDispatch;

  const coachesList = useSelector((state: RootState) => state.coaches.list);

  useEffect(() => {
    dispatch(fetchAllCoaches());
  }, []);

  const exportToCsv = (filename: string, rows: Array<(string | number)[]>) => {
    const csvContent =
      "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);

    link.click();
  };

  const handleExportClick = () => {
    const headers = ["ID", "Name", "LastName", "Phone", "Medals"];
    const data = coachesList.map((coach) => [
      coach._id,
      coach.name,
      coach.lastname,
      coach.phone,
      coach.medals,
    ]);
    exportToCsv("coachs.csv", [headers, ...data]);
  };

  const onCreate = () => {
    setShowModal(true);
  };

  const handleOnSave = ({ _id, ...rest }: any) => {
    const newCoach = {
      ...rest,
    };
    dispatch(addCoach(newCoach));
  };

  const handleOnUpdate = (data: any) => {
    dispatch(updateCoach(data));
  };

  const onEditPress = (coach: TCoach) => {
    setShowModal(true);
    dispatch(setCurrentCoach(coach));
  };

  const onDeletePress = (_id: string) => {
    if (confirm("¿Estás seguro de eliminar este entrenador?")) {
      dispatch(deleteCoach({ _id }));
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <ModalForm
        isVisible={showModal}
        onDismiss={() => setShowModal(false)}
        onSave={handleOnSave}
        onUpdate={handleOnUpdate}
      ></ModalForm>
      <div className="py-8">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">
            Entrenadores Pokémon
          </h2>
        </div>
        <div className="my-2 flex sm:flex-row flex-col">
          <div className="flex flex-row flex-1 justify-end">
            <a
              href={"/"}
              className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded mr-4"
            >
              {"Inicio"}
            </a>
            <button
              onClick={handleExportClick}
              className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded mr-4"
            >
              {"Exportar a CSV"}
            </button>

            <button
              onClick={onCreate}
              className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded"
            >
              Crear Nuevo Entrenador
            </button>
          </div>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Apellidos
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Teléfono
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Medallas de Gimnasio
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
                </tr>
              </thead>
              <tbody>
                {coachesList.map((coach, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {coach.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {coach.lastname}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {coach.phone}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {coach.medals}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex justify-end">
                      <button
                        onClick={() => onEditPress(coach)}
                        className="text-white bg-green-500 border-0 py-1 px-3 focus:outline-none hover:bg-green-600 rounded text-xs"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => onDeletePress(coach._id)}
                        className="text-white bg-red-500 border-0 py-1 px-3 focus:outline-none hover:bg-red-600 rounded text-xs ml-4"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachesList;
