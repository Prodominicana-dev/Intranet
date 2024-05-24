"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import {
  editQuestion,
} from "@/service/rrhh/poll-commitment/poll-question/service";
import { usePollDirection } from "@/service/rrhh/poll-commitment/direction/service";
import { usePollCategory } from "@/service/rrhh/poll-commitment/category/service";
import Select from "react-select";

export function EditPollQuestionDialog({
  question,
  open,
  handler,
  update,
}: {
  question: any;
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [directionsId, setDirectionsId] = useState("");
  const [pollquestioncategoryId, setPollQuestioncategoryId] = useState("");
  const { data:dataCategory } = usePollCategory();
  const { data:datadirection } = usePollDirection();
  const [warning, setWarning] = useState(false);

  console.log('question data',question);
  
  
  const options = datadirection?.map((direction: any) => ({
    value: direction.id,
    label: direction.name,
  }));

  const optionsCategory = dataCategory?.map((category: any) => ({
    value: category.id,
    label: category.name,
  }));
  

  useEffect(() => {
    if (question) {
      setName(question.name);
    
    }
  }, [question]);

  useEffect(() => {
    if (question) {
      setDirectionsId(question.directionsId);
    
    }
  }, [question]);
  useEffect(() => {
    if (question) {
      setPollQuestioncategoryId(question.pollquestioncategoryId);
    
    }
  }, [question]);

  const handleSubmit = async () => {
    setIsLoading(true);
    if (name === "") {
      setIsLoading(false);
      setWarning(true);
      return;
    }

    const data = {
      name,
      directionsId,
      pollquestioncategoryId
    };
    await editQuestion(question.id, data, handler, update);
    setIsLoading(false);
  };

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
          Editar la Pregunta de la encuesta
        </DialogHeader>

        <DialogBody
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          placeholder={undefined}
          className="flex flex-col font-montserrat space-y-4 overflow-y-auto no-scrollbar"
        >
          <form className="w-full flex flex-col gap-5" action={handleSubmit}>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="name" className="text-black font-2xl font-bold">
              Pregunta de La Encuesta <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                className="px-2 py-2 text-black rounded-lg  ring-1 ring-gray-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {warning && name === "" && (
              <label htmlFor="name" className="text-red-600 font-xs">
                 la Pregunta de la encuentas es obligatoria.
              </label>
            )}

<div className="w-full flex flex-col gap-1">
              <label htmlFor="type" className="text-black font-2xl font-bold">
               Dirección  <span className="text-red-600">*</span>
              </label>
              <Select
                menuPosition="fixed"
                id="type"
                options={options}
                value={options?.map((a:any) => {
                  return a.value === directionsId? a : null;
                })}
                onChange={(e: any) => setDirectionsId(e.value)}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 8,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                  },
                })}
              />
            </div>
          
<div className="w-full flex flex-col gap-1">
              <label htmlFor="type" className="text-black font-2xl font-bold">
              Categoría  <span className="text-red-600">*</span>
              </label>
              <Select
                menuPosition="fixed"
                id="type"
                options={optionsCategory}
                value={optionsCategory?.map((a:any) => {
                  return a.value === pollquestioncategoryId? a : null;
                })}
                onChange={(e: any) => setPollQuestioncategoryId(e.value)}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 8,
                  colors: {
                    ...theme.colors,
                    primary: "black",
                  },
                })}
              />
            </div>
          
          </form>
        </DialogBody>
        <DialogFooter
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          placeholder={undefined}
          className="space-x-4 font-montserrat"
        >
          <button
            className={`${"w-36 h-12 bg-green-500 border-2 border-green-500 text-white hover:bg-white hover:text-green-500 hover:shadow-lg duration-300 rounded-xl flex items-center justify-center"}`}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <Spinner
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                className="w-7 h-7"
              />
            ) : (
              "Guardar"
            )}
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
