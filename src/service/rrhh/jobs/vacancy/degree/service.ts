import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useVacancyDegree() {
  return useQuery({
    queryKey: ["vacancy-degree"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/degree/`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function createDegree(
  data: any,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/degree/`;
    const response = await axios.post(url, data);
    if (response.status === 201) {
      toast.success("Titulo creada correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (e) {
    toast.error("Error al crear el Titulo", {
      duration: 4000,
      position: "top-center",
    });
  }
}

export async function editDegree(
  id: string,
  data: any,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/degree/${id}`;
    const response = await axios.patch(url, data);
    if (response.status === 200) {
      toast.success("Ttitulo actualizada correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (error) {
    toast.error("Error al actualizar la Titulo", {
      duration: 4000,
      position: "top-center",
    });
    handler();
  }
}

export async function deleteDegree(
  id: string,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/degree/${id}`;
    const response = await axios.delete(url);
    if (response.status === 200) {
      toast.success("Titulo eliminado correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (error) {
    toast.error("Error al eliminar este Titulo", {
      duration: 4000,
      position: "top-center",
    });
    handler();
  }
}
