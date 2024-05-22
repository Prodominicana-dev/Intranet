"use client";
import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
  Textarea,
} from "@material-tailwind/react";
import { createCategory } from "@/service/rrhh/jobs/vacancy/category/service";
import Image from "next/image";
import {
  XMarkIcon,
  PencilIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

export function VacancyCategoryDialog({
  open,
  handler,
  update,
}: {
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [warning, setWarning] = useState(false);
  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleDeleteFile = () => {
    setFile(null);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (name === "" || !file) {
      setIsLoading(false);
      setWarning(true);
      return;
    }

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("icon", file as File);
    await createCategory(formData, handler, update);
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
          Agregar categoría
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
                Nombre <span className="text-red-600">*</span>
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
                El nombre es obligatorio.
              </label>
            )}
            <div className="w-full flex flex-col gap-1">
              <label
                htmlFor="description"
                className="text-black font-bold font-montserrat"
              >
                Ícono <span className="text-red-600">*</span>
              </label>
              {file && (
                <div className="size-36 rounded-full bg-gray-50 p-1 relative">
                  <Image
                    src={URL.createObjectURL(file as Blob)}
                    alt="preview"
                    width={100}
                    height={100}
                    className="size-20 bg-gray-50 p-1"
                  />
                  <button
                    onClick={handleDeleteFile}
                    className="size-8 rounded-full bg-red-600 absolute top-1 left-1 flex justify-center items-center"
                  >
                    <XMarkIcon className="size-5 text-white" />
                  </button>
                  <button
                    onClick={handleClick}
                    className="size-8 rounded-full bg-blue-900 absolute bottom-1 right-1 flex justify-center items-center"
                  >
                    <PencilIcon className="size-5 text-white" />
                  </button>
                </div>
              )}
              {!file && (
                <div className="size-36 rounded-full bg-gray-50 p-1 relative flex justify-center items-center">
                  <ArrowDownTrayIcon className="size-16" />
                  <div
                    onClick={handleClick}
                    className="size-8 rounded-full bg-blue-900 absolute bottom-1 right-1 flex justify-center items-center hover:cursor-pointer "
                  >
                    <PencilIcon className="size-5 text-white" />
                  </div>
                </div>
              )}
              {warning && !file && (
                <label htmlFor="name" className="text-red-600 font-xs">
                  El ícono es obligatorio.
                </label>
              )}
              <input
                type="file"
                ref={inputRef}
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) {
                    setFile(e.target.files[0]);
                  }
                }}
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
