import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function usePollCategory() {
  return useQuery({
    queryKey: ["poll-category"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/pollcommitmentcategory/`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function createCategory(
  data: any,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/pollcommitmentcategory/`;
    const response = await axios.post(url, data);
    if (response.status === 201) {
      toast.success(" Categoría creada correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (e) {
    toast.error("Error al crear la Categoría", {
      duration: 4000,
      position: "top-center",
    });
  }
}

export async function editCategory(
  id: string,
  data: any,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/pollcommitmentcategory/${id}`;
    const response = await axios.patch(url, data);
    if (response.status === 200) {
      toast.success("Categoría actualizada correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (error) {
    toast.error("Error al actualizar la Categoría", {
      duration: 4000,
      position: "top-center",
    });
    handler();
  }
}

export async function deleteCategory(
  id: string,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/pollcommitmentcategory/${id}`;
    const response = await axios.delete(url);
    if (response.status === 200) {
      toast.success("Categoría eliminada correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (error) {
    toast.error("Error al eliminar esta Categoría", {
      duration: 4000,
      position: "top-center",
    });
    handler();
  }
}
