import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function usePollQuestion() {
  return useQuery({
    queryKey: ["poll-question"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/pollquestion/`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function createQuestion(
  data: any,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/pollquestion/`;
    const response = await axios.post(url, data);
    if (response.status === 201) {
      toast.success(" Pregunta creada correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (e) {
    toast.error("Error al crear la Pregunta", {
      duration: 4000,
      position: "top-center",
    });
  }
}

export async function editQuestion(
  id: string,
  data: any,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/pollquestion/${id}`;
    const response = await axios.patch(url, data);
    if (response.status === 200) {
      toast.success("Pregunta actualizada correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (error) {
    toast.error("Error al actualizar la Pregunta", {
      duration: 4000,
      position: "top-center",
    });
    handler();
  }
}

export async function deleteQuestion(
  id: string,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/pollquestion/${id}`;
    const response = await axios.delete(url);
    if (response.status === 200) {
      toast.success("Pregunta eliminada correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (error) {
    toast.error("Error al eliminar esta Pregunta", {
      duration: 4000,
      position: "top-center",
    });
    handler();
  }
}
