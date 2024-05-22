import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function usePollDirection() {
  return useQuery({
    queryKey: ["poll-direction"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/direction/`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function createDirection(
  data: any,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/direction/`;
    const response = await axios.post(url, data);
    if (response.status === 201) {
      toast.success("Dirección creada correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (e) {
    toast.error("Error al crear la Dirección", {
      duration: 4000,
      position: "top-center",
    });
  }
}

export async function editDirection(
  id: string,
  data: any,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/direction/${id}`;
    const response = await axios.patch(url, data);
    if (response.status === 200) {
      toast.success("Dirección actualizada correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (error) {
    toast.error("Error al actualizar la Dirección", {
      duration: 4000,
      position: "top-center",
    });
    handler();
  }
}

export async function deleteDirection(
  id: string,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/direction/${id}`;
    const response = await axios.delete(url);
    if (response.status === 200) {
      toast.success("Dirección eliminada correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (error) {
    toast.error("Error al eliminar esta Dirección", {
      duration: 4000,
      position: "top-center",
    });
    handler();
  }
}
