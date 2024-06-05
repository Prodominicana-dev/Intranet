import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useApplicationByVacancy(id: string) {
  return useQuery({
    queryKey: ["applicationsByVacancy", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/application/v/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function approveApplicant(
  id: any,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/application/approved/${id}`;
    const response = await axios.patch(url, null);
    if (response.status === 200) {
      toast.success("Aplicación aprobada correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (e) {
    toast.error("Error al aprobar la aplicación", {
      duration: 4000,
      position: "top-center",
    });
  }
}

export async function deniedApplication(
  id: any,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/application/denied/${id}`;
    const response = await axios.patch(url, null);
    if (response.status === 200) {
      toast.success("Aplicación rechazada correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (e) {
    toast.error("Error al rechazar la aplicación", {
      duration: 4000,
      position: "top-center",
    });
  }
}
