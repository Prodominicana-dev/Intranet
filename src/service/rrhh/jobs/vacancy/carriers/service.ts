import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCareers() {
  return useQuery({
    queryKey: ["vacancy-carriers"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/carriers/`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function createCarriers(
  data: any,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/carriers/`;
    const response = await axios.post(url, data);
    if (response.status === 201) {
      toast.success("carrera creada correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (e) {
    toast.error("Error al crear la carrera", {
      duration: 4000,
      position: "top-center",
    });
  }
}

export async function editcarriers(
  id: string,
  data: any,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/carriers/${id}`;
    const response = await axios.patch(url, data);
    if (response.status === 200) {
      toast.success("carrera actualizado correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (error) {
    toast.error("Error al actualizar la carrera", {
      duration: 4000,
      position: "top-center",
    });
    handler();
  }
}

export async function deletecarriers(
  id: string,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/carriers/${id}`;
    const response = await axios.delete(url);
    if (response.status === 200) {
      toast.success("carrera eliminada correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (error) {
    toast.error("Error al eliminar esta carrera", {
      duration: 4000,
      position: "top-center",
    });
    handler();
  }
}
