"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import Select from "react-select";
import { createQuestion } from "@/service/rrhh/jobs/question/service";


export function QuestionDialog({
  open,
  handler,
  update,
}: {
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [type, setType] = useState("");
  const [options, setOptions] = useState("");
  const [warning, setWarning] = useState(false);

  const types = [
    { value: "text", label: "Texto" },
    { value: "select", label: "Opción múltiple" },
  ]

  const handleSubmit = async () => {
    let optionsArray: any = []
    setIsLoading(true);
    if(question === "" || type === ""){
      setIsLoading(false);
      setWarning(true);
      return;
    }
    if(options !== ""){
      optionsArray = options.split(",");
      // Trimear las opciones
      optionsArray = optionsArray.map((option: string) => option.trim());
    }
    const data = {
      question,
      type,
      options: optionsArray
    }
    await createQuestion(data, handler, update);
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
              <Select menuPosition="fixed" id="type" options={types} 
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
              />
            </div>
            {warning && type === "" &&             
            <label htmlFor="type" className="text-red-600 font-xs">El tipo de pregunta es obligatorio.</label>
            }
            {type === "select" && (<div className="w-full flex flex-col gap-1">
            <label htmlFor="question" className="text-black font-2xl font-bold">Opciones <span className="text-red-600">*</span></label>
              <textarea onChange={(e) => setOptions(e.target.value)} name="options" id="options"  cols={10} rows={4} className="py-2 px-2 text-black rounded-lg ring-1 ring-gray-400"></textarea>
              <label htmlFor="question" className="text-black font-sm">Separe por comas {"("},{")"} las opciones.</label>

            </div>)}
            
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
