import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useQuestionOptions(id: string) {
  return useQuery({
    queryKey: ["question-option"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/question-option/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function createQuestionOptions(
  id: string,
  data: any,
  handler: () => void,
  update: () => void
) {
  try {
    if (data.type === "select") {
      toast("Creando la pregunta...", {
        duration: 4000,
        position: "top-center",
        icon: "🕙",
      });
    }
    const url = `${process.env.NEXT_PUBLIC_API_URL}/question-option/${id}`;
    const response = await axios.post(url, data);
    if (response.status === 201) {
      data.lengt > 1
        ? toast.success("Opciones creadas correctamente", {
            duration: 4000,
            position: "top-center",
          })
        : toast.success("Opción creada correctamente", {
            duration: 4000,
            position: "top-center",
          });
      handler();
      update();
    }
  } catch (e) {
    data.lengt > 1
      ? toast.error("Error al crear las opciones", {
          duration: 4000,
          position: "top-center",
        })
      : toast.error("Error al crear la opción", {
          duration: 4000,
          position: "top-center",
        });
    handler();
  }
}

export async function editQuestionOptions(
  id: string,
  data: any,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/question-option/${id}`;
    const response = await axios.patch(url, data);
    if (response.status === 200) {
      toast.success("Opción actualizada correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (error) {
    toast.error("Error al actualizar la opción", {
      duration: 4000,
      position: "top-center",
    });
    handler();
  }
}

export async function deleteQuestionOption(
  id: string,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/question-option/${id}`;
    const response = await axios.delete(url);
    if (response.status === 200) {
      toast.success("Opción eliminada correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (error) {
    toast.error("Error al eliminar esta opción", {
      duration: 4000,
      position: "top-center",
    });
    handler();
  }
}
