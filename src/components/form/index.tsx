import { IPerson, Person } from "@/interfaces/Person";
import { useDispatch, useSelector } from "react-redux";
import {
  PersonState,
  setData,
  setPersons,
} from "@/features/person/personSlice";
import { PersonService } from "@/services/person.service";
import Swal from "sweetalert2";
import React from "react";

export const Form = () => {
  const { person } = useSelector((state: { person: PersonState }) => state);

  const [errorForm, setErrorForm] = React.useState({
    name: false,
    address: false,
    phone: false,
  });

  const dispatch = useDispatch();

  const isValidForm = () => {
    const error = { name: false, address: false, phone: false };

    if (!person.data.name) error.name = true;
    if (!person.data.address) error.address = true;
    if (!person.data.phone) error.phone = true;

    setErrorForm(error);

    return error.name || error.address || error.phone;
  };

  const personService = new PersonService();

  const setFormValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setData({
        ...person.data,
        [event.target.name]: event.target.value,
      })
    );
  };

  const fetchUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const data: IPerson = await personService.put(person.data);

      const dataArray: IPerson[] = [...person.list];

      let index: number = dataArray.findIndex(
        (item: IPerson) => item.id === data.id
      );

      dataArray.splice(index, 1, data);

      dispatch(setPersons(dataArray));

      dispatch(setData(new Person({} as IPerson)));

      Swal.fire({
        icon: "success",
        title: "Actualizado",
        text: "Se actualizo correctamente",
      });
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  const fetchCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      if (isValidForm()) return null;

      const data: IPerson = await personService.post(person.data);

      dispatch(setData(new Person({} as IPerson)));

      const dataArray: IPerson[] = [...person.list];
      dataArray.push(data);
      dispatch(setPersons(dataArray));

      Swal.fire({
        icon: "success",
        title: "Creado",
        text: "Se creo correctamente",
      });
    } catch (error) {}
  };

  const inputCSS =
    "block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";
  const inputError = "border-red-400";

  return (
    <div className="px-8 py-4 pb-8 rounded-lg bg-gray-50">
      <form
        onSubmit={(e) => (person.data.id ? fetchUpdate(e) : fetchCreate(e))}>
        <div className="mt-4">
          <label className="mb-2 text-gray-800">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Lan developer"
            value={person.data.name}
            onChange={(e) => setFormValue(e)}
            className={errorForm.name ? inputCSS + " " + inputError : inputCSS}
          />
          {errorForm.name && (
            <p className="text-red-400 mt-1 text-sm">Campo requerido</p>
          )}
        </div>

        <div className="mt-4">
          <label className="mb-2 text-gray-800">Direccion</label>
          <input
            type="text"
            id="address"
            name="address"
            placeholder="California C11 100"
            value={person.data.address}
            onChange={(e) => setFormValue(e)}
            className={errorForm.name ? inputCSS + " " + inputError : inputCSS}
          />
          {errorForm.address && (
            <p className="text-red-400 mt-1 text-sm">Campo requerido</p>
          )}
        </div>

        <div className="mt-4">
          <label className="mb-2 text-gray-800">Numero</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="123456789"
            value={person.data.phone}
            onChange={(e) => setFormValue(e)}
            className={errorForm.name ? inputCSS + " " + inputError : inputCSS}
          />
          {errorForm.phone && (
            <p className="text-red-400 mt-1 text-sm">Campo requerido</p>
          )}
        </div>

        <button className="w-full mt-8 bg-teal-600 text-gray-50 font-semibold py-2 px-4 rounded-lg">
          {person.data.id ? "Guardar" : "Crear"}
        </button>
      </form>
    </div>
  );
};
