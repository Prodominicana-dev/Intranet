"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import { editDepartment } from "@/service/rrhh/poll-commitment/department/service";
import { usePollDirection } from "@/service/rrhh/poll-commitment/direction/service";
import Select from "react-select";
export function EditPollDepartmentDialog({
  department,
  open,
  handler,
  update,
}: {
  department: any;
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [directionsId, setDirectionsId] = useState("");
  const { data: datadirection } = usePollDirection();
  const [warning, setWarning] = useState(false);

  const options = datadirection?.map((direction: any) => ({
    value: direction.id,
    label: direction.name,
  }));

  useEffect(() => {
    if (department) {
      setName(department.name);
    }
  }, [department]);

  useEffect(() => {
    if (department) {
      setDirectionsId(department.directionsId);
    }
  }, [department]);

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
    };
    await editDepartment(department.id, data, handler, update);
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
          Editar Departamento
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
                Departamento <span className="text-red-600">*</span>
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
                El Departamento
              </label>
            )}

            <div className="w-full flex flex-col gap-1">
              <label htmlFor="type" className="text-black font-2xl font-bold">
                Dirección <span className="text-red-600">*</span>
              </label>
              <Select
                menuPosition="fixed"
                id="type"
                options={options}
                value={options?.map((a: any) => {
                  return a.value === directionsId ? a : null;
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
