import axios from 'axios'
import { useQuery } from "@tanstack/react-query";
import toast from 'react-hot-toast';

export function useQuestions() {
    return useQuery({
      queryKey: ["questions"],
      queryFn: async () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/question/`;
        const { data } = await axios.get(url);
        return data;
      },
    });
  }

  export async function createQuestion(data: any, handler: () => void, update: () => void) {
    try{
        const question = {
            question: data.question,
            type: data.type
        }
        if(data.type === "select"){
            toast("Creando la pregunta...", {
                duration: 4000,
                position: 'top-center',
                icon: '🕙',
            })
        }        
        const url = `${process.env.NEXT_PUBLIC_API_URL}/question/`;
        const response = await axios.post(url, question);
        if(question.type !== "select" && response.status === 201){
            toast.success("Pregunta creada correctamente", {
                duration: 4000,
                position: 'top-center',
                
            })
            handler()
            update()
        }
        if(question.type === "select" && response.status === 201){
            toast.success("Pregunta creada correctamente", {
                duration: 4000,
                position: 'top-center',
            })
            toast("Almacenando las opciones de respuesta...", {
                duration: 4000,
                position: 'top-center',
                icon: '🕙',
            })
            const optionsUrl = `${process.env.NEXT_PUBLIC_API_URL}/question-option/${response.data.id}/`;
            // Convertir las opciones en un array de objetos con { option: "Opcion" }
            const options = data.options.map((option: string) => {
                return {option}
            })
            const optionsResponse = await axios.post(optionsUrl, options);

            if(optionsResponse.status === 201){
                toast.success("Opciones de respuesta almacenadas correctamente", {
                    duration: 4000,
                    position: 'top-center',
                })
                handler()
                update()
            }
            if(optionsResponse.status === 500){
                toast.error("Error al almacenar las opciones de respuesta", {
                    duration: 4000,
                    position: 'top-center',
                })
            }
        }
        if(response.status === 500){
            toast.error("Error al crear la pregunta", {
                duration: 4000,
                position: 'top-center',
            })
        }
    }catch(e){
        toast.error("Error al crear la pregunta", {
            duration: 4000,
            position: 'top-center',
        })
    }
  }

  export async function editQuestion(id: string, data: any, handler: () => void, update: () => void){
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/question/${id}`;
        const response = await axios.patch(url, data);
        if(response.status === 200){
            toast.success("Pregunta actualizada correctamente", {
                duration: 4000,
                position: 'top-center',
                
            })
            handler()
            update()
        }
    } catch (error) {
        toast.error("Error al actualizar la pregunta", {
            duration: 4000,
            position: 'top-center',
        })
    }
  }

  export async function deleteQuestion(id: string, handler: () => void, update: () => void){
    try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/question/${id}`;
        const response = await axios.delete(url);
        if(response.status === 200){
            toast.success("Pregunta eliminada correctamente", {
                duration: 4000,
                position: 'top-center',
                
            })
            handler()
            update()
        }
    } catch (error) {
        toast.error("Error al eliminar la pregunta", {
            duration: 4000,
            position: 'top-center',
        })
    }
  }

