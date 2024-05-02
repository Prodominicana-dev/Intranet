"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import Select from "react-select";
import { editQuestion } from "@/service/rrhh/jobs/question/service";


export function EditQuestionDialog({
    questions,
  open,
  handler,
  update,
}: {
    questions: any;
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [type, setType] = useState("");
  const [warning, setWarning] = useState(false);


  const types = [
    { value: "text", label: "Texto" },
    { value: "select", label: "Opción múltiple" },
  ]

  useEffect(()=>{
    setQuestion(questions?.question)
    setType(questions?.type)
  }, [questions])

  const handleSubmit = async () => {
    setIsLoading(true);
    if(question === "" || type === ""){
        setIsLoading(false);
        setWarning(true);
        return;
      }
    const data = {
      question,
      type,
    }
    await editQuestion(questions.id, data, handler, update);
    setIsLoading(false);
  }

  return (
    <>
      <Dialog
       onPointerEnterCapture={undefined}
       onPointerLeaveCapture={undefined}
        placeholder={undefined}
        open={open}
        handler={handler}
        className="p-2 "
      >
        <DialogHeader
         onPointerEnterCapture={undefined}
         onPointerLeaveCapture={undefined}
          placeholder={undefined}
          className="font-semibold flex flex-col items-start gap-1 font-montserrat"
        >
          Agregar pregunta
          
        </DialogHeader>

        <DialogBody
         onPointerEnterCapture={undefined}
         onPointerLeaveCapture={undefined}
          placeholder={undefined}
          className="flex flex-col font-montserrat space-y-4 overflow-y-auto no-scrollbar"
        >
          <form  className="w-full flex flex-col gap-5" action={handleSubmit}>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="question" className="text-black font-2xl font-bold">Pregunta <span className="text-red-600">*</span></label>
              <input type="text" id="question" className="px-2 py-2 text-black rounded-lg  ring-1 ring-gray-400" value={question} onChange={(e) => setQuestion(e.target.value)}/>
            </div>
            {warning && question === "" &&             
              <label htmlFor="question" className="text-red-600 font-xs">La pregunta es obligatoria.</label>
            }
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="type" className="text-black font-2xl font-bold">Tipo de pregunta <span className="text-red-600">*</span></label>
              <Select menuPosition="fixed" options={types} 
              onChange={(e: any) => setType(e.value)}
              theme={(theme) => ({
                ...theme,
                borderRadius: 8,
                colors: {
                  ...theme.colors,
                  primary: "black",
                },
              })}
              placeholder="Selecciona un tipo de pregunta"
              value={types.find((opt) => opt.value === type)}
              />
            </div>
            {warning && type === "" &&             
            <label htmlFor="type" className="text-red-600 font-xs">El tipo de pregunta es obligatorio.</label>
            }
            <label className="text-xs text-center text-black">En caso de cambiarle el tipo de una pregunta de selección múltiple se eliminarán todas las opciones, así que ten mucho cuidado con los cambios que realices.</label>

          </form>
        </DialogBody>
        <DialogFooter
         onPointerEnterCapture={undefined}
         onPointerLeaveCapture={undefined}
          placeholder={undefined}
          className="space-x-4 font-montserrat"
        >
          
          <button
            className={`${
                "w-36 h-12 bg-green-500 border-2 border-green-500 text-white hover:bg-white hover:text-green-500 hover:shadow-lg duration-300 rounded-xl flex items-center justify-center"
            }`}
            onClick={handleSubmit}
          >
            {
              isLoading ? (
                <Spinner  onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}  className="w-7 h-7" />
              ) : (
                "Guardar"
              )
            }
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
