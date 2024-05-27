import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDegrees() {
  return useQuery({
    queryKey: ["degrees"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/degree/`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useVacancy() {
  return useQuery({
    queryKey: ["vacancies"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/vacancy/`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function createVacancy(
  data: any,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/vacancy/`;
    const response = await axios.post(url, data);
    if (response.status === 201) {
      toast.success("Vacante creada correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (e) {
    toast.error("Error al crear la vacante", {
      duration: 4000,
      position: "top-center",
    });
  }
}
