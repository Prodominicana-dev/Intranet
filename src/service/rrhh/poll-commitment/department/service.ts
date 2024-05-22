import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function usePollDepartment() {
  return useQuery({
    queryKey: ["poll-department"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/department/`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function createDepartment(
  data: any,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/department/`;
    const response = await axios.post(url, data);
    if (response.status === 201) {
      toast.success(" Departamento creado correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (e) {
    toast.error("Error al crear el Departamento", {
      duration: 4000,
      position: "top-center",
    });
  }
}

export async function editDepartment(
  id: string,
  data: any,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/department/${id}`;
    const response = await axios.patch(url, data);
    if (response.status === 200) {
      toast.success("Departamento actualizado correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (error) {
    toast.error("Error al actualizar el Departamento", {
      duration: 4000,
      position: "top-center",
    });
    handler();
  }
}

export async function deleteDepartment(
  id: string,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/department/${id}`;
    const response = await axios.delete(url);
    if (response.status === 200) {
      toast.success("Departamento eliminado correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (error) {
    toast.error("Error al eliminar este Departamento", {
      duration: 4000,
      position: "top-center",
    });
    handler();
  }
}
