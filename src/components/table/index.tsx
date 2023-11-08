"use client";
import { useDispatch, useSelector } from "react-redux";
import { IPerson, Person } from "@/interfaces/Person";
import {
  PersonState,
  setData,
  setPersons,
} from "@/features/person/personSlice";
import { PersonService } from "@/services/person.service";
import Swal from "sweetalert2";
import { useEffect } from "react";

export const Table = () => {
  const { person } = useSelector((state: { person: PersonState }) => state);

  const personService = new PersonService();

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const res: IPerson[] = await personService.getAll();
      dispatch(setPersons(res));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickDelete = async (item: IPerson) => {
    Swal.fire({
      title: "Estas seguro?",
      showCancelButton: true,
      confirmButtonText: `Si`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        fetchDelete(item);
      }
    });
  };

  const fetchDelete = async (item: IPerson) => {
    try {
      await personService.delete(item);

      Swal.fire({
        icon: "success",
        title: "Eliminado",
        text: "Se elimino correctamente",
      });

      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const onClickInfo = async (item: IPerson) => {
    try {
      const data: IPerson = await personService.getById(item.id!);

      Swal.fire({
        title: "Informacion",
        icon: "info",
        html: `
        <b>Nombre:</b> ${data.name} <br>
        <b>Apellido:</b> ${data.address} <br>
        <b>Edad:</b> ${data.phone} <br>`,
        showCloseButton: false,
        showCancelButton: false,
        confirmButtonText: `Ok`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="inline-block">
      <button
        className="bg-teal-600 text-gray-50 font-semibold py-2 px-4 rounded-lg
        mb-4"
        onClick={() => dispatch(setData(new Person({} as IPerson)))}>
        Nuevo
      </button>

      <div className="overflow-hidden border border-gray-200 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-slate-800">
            <tr>
              <th
                scope="col"
                className="px-6 py-3.5 text-slate-50 font-medium text-left">
                Nombre
              </th>
              <th
                scope="col"
                className="px-6 py-3.5 text-slate-50 font-medium text-left">
                Direccion
              </th>

              <th
                scope="col"
                className="px-6 py-3.5 text-slate-50 font-medium text-left">
                Numero
              </th>
              <th
                scope="col"
                className="px-6 py-3.5 text-slate-50 font-medium text-left">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {person.list.map((item: IPerson, i) => {
              return (
                <tr key={i}>
                  <td className="px-4 py-4 whitespace-nowrap">{item.name}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {item.address}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">{item.phone}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-x-6">
                      <button
                        className="bg-sky-600 text-sky-50 font-semibold py-2 px-4 rounded-lg"
                        onClick={() => onClickInfo(item)}>
                        Info
                      </button>
                      <button
                        className="bg-gray-600 text-gray-50 font-semibold py-2 px-4 rounded-lg"
                        onClick={() => dispatch(setData(item))}>
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-red-50 font-semibold py-2 px-4 rounded-lg"
                        onClick={() => onClickDelete(item)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
