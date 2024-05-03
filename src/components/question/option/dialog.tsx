"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import { createQuestion } from "@/service/rrhh/jobs/question/service";
import { createQuestionOptions } from "@/service/rrhh/jobs/question-option/service";

export function QuestionOptionDialog({
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
  const [options, setOptions] = useState("");
  const [warning, setWarning] = useState(false);

  const handleSubmit = async () => {
    let optionsArray: any = [];
    setIsLoading(true);
    if (options === "") {
      setIsLoading(false);
      setWarning(true);
      return;
    }
    if (options !== "") {
      optionsArray = options.split(",");
      // Trimear las opciones
      optionsArray = optionsArray.map((option: string) => option.trim());
    }
    // Crear el data, que seria un array con questionId y option
    const data = optionsArray.map((option: string) => {
      return {
        questionId: question.id,
        option,
      };
    });
    console.log(data);
    await createQuestionOptions(question.id, data, handler, update);
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
          Agregar opciones de respuesta
        </DialogHeader>

        <DialogBody
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          placeholder={undefined}
          className="flex flex-col font-montserrat space-y-4 overflow-y-auto no-scrollbar"
        >
          <div>
            <div className="w-full text-black font-bold text-xl">
              {question.question}
            </div>
            <div className="w-full text-black text-sm">Pregunta</div>
          </div>
          <form className="w-full flex flex-col gap-5" action={handleSubmit}>
            <label htmlFor="question" className="text-black font-2xl font-bold">
              Opciones <span className="text-red-600">*</span>
            </label>
            <textarea
              onChange={(e) => setOptions(e.target.value)}
              name="options"
              id="options"
              cols={10}
              rows={4}
              className="py-2 px-2 text-black rounded-lg ring-1 ring-gray-400"
            ></textarea>
            <p className="text-black font-xs">
              Separe las opciones por comas {"("},{")"}.
            </p>
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
