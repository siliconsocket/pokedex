import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";

const formFields = [
  {
    name: "name",
    type: "text",
    placeholder: "Nombre",
  },
  {
    name: "lastname",
    type: "text",
    placeholder: "Apellidos",
  },
  {
    name: "phone",
    type: "tel",
    placeholder: "Teléfono",
  },
  {
    name: "medals",
    type: "number",
    placeholder: "Medallas de Gimnasio",
  },
];

const ModalForm = ({ isVisible, onDismiss, onSave, onUpdate }) => {
  const [currentCoach, setcurrentCoach] = useState({
    _id: "",
    name: "",
    lastname: "",
    phone: "",
    medals: 0,
  });
  const [errors, setErrors] = useState({});
  const coach = useSelector((state: RootState) => state.coaches.current);

  useEffect(() => {
    if (coach) {
      setcurrentCoach(coach);
    }
  }, [coach]);

  const validate = () => {
    const tempErrors = {};
    setErrors(tempErrors);
    if (currentCoach._id) {
      tempErrors._id = currentCoach?._id ? "" : "El id es requerido";
    }
    tempErrors.name = currentCoach.name.trim() ? "" : "El nombre es requerido";
    tempErrors.lastname = currentCoach.lastname.trim()
      ? ""
      : "El apellido es requerido";
    tempErrors.phone = /^\+?\d{10,15}$/.test(currentCoach.phone)
      ? ""
      : "Número de teléfono inválido";
    tempErrors.medals =
      currentCoach.medals >= 0
        ? ""
        : "La cantidad de medallas debe ser un número positivo";
    setErrors(tempErrors);

    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = () => {
    if (validate()) {
      setErrors({});
      if (currentCoach._id) {
        onUpdate(currentCoach);
      } else {
        onSave(currentCoach);
      }
      onDismiss();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcurrentCoach((prev) => ({ ...prev, [name]: value }));
  };

  if (!isVisible) return null;

  const renderForm = () =>
    formFields.map((field) => (
      <input
        key={field.name}
        type={field.type}
        name={field.name}
        value={currentCoach[field.name]}
        onChange={handleChange}
        className="w-full p-2 border rounded mt-2"
        placeholder={field.placeholder}
      />
    ));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {currentCoach._id ? "Editar" : "Crear"} Entrenador
                </h3>
                {Object.values(errors).length > 0 ? (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
                    {Object.values(errors).map((error, index) => {
                      return <p key={index}>{error}</p>;
                    })}
                  </div>
                ) : null}
                {/* Formulario */}
                <div className="mt-2">{renderForm()}</div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={onDismiss}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
