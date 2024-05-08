import { TrashIcon } from "@heroicons/react/24/solid";
import { Dialog, DialogBody, Spinner } from "@material-tailwind/react";
import React, { useState } from "react";
import { Montserrat } from "next/font/google";
const monserratStyle = Montserrat({ subsets: ["latin"] });

export default function DeleteButton({
  open,
  handleOpen,
  title,
  message,
  value,
  funct,
}: {
  open: boolean;
  handleOpen: () => void;
  title: string;
  message: string;
  value: string;
  funct: () => void;
}) {
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Dialog
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        placeholder={undefined}
        open={open}
        handler={handleOpen}
        size="sm"
      >
        <DialogBody
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          style={monserratStyle.style}
          placeholder={undefined}
          className="font-sans text-black"
        >
          <div className="flex flex-col items-center justify-center p-3 space-y-12 w-full">
            <TrashIcon className="w-full h-24 text-red-700 md:h-40" />
            <div className="space-y-2">
              <p className="w-full text-lg font-bold md:text-3xl">{title}</p>
              <p className="w-full text-xs font-normal md:w-11/12 md:text-base">
                {message}
              </p>
            </div>
            <div className="w-full flex flex-col gap-5">
              <label htmlFor="confirm">
                Para confirmar esta acción por favor escriba:{" "}
              </label>
              <p className="px-2 bg-gray-100 rounded-lg text-center font-semibold py-3">
                {value}
              </p>
              <input
                type="text"
                className="w-full rounded-lg p-2 ring-1 ring-gray-300"
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
            <div className="flex flex-row w-full space-x-3">
              {value === confirm && (
                <button
                  disabled={isLoading || value !== confirm}
                  className="w-full h-12 font-normal text-red-500 duration-300 bg-white rounded-lg hover:shadow-lg hover:text-white hover:bg-red-500 border-2 border-red-500  flex justify-center items-center"
                  onClick={() => {
                    setIsLoading(true);
                    funct();
                  }}
                >
                  {isLoading ? (
                    <Spinner
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                      className="w-7 h-7"
                    />
                  ) : (
                    "Eliminar"
                  )}
                </button>
              )}
              <button
                onClick={handleOpen}
                className="w-full h-12 font-normal text-white duration-300 bg-red-500 border-2 border-red-500 rounded-lg hover:shadow-lg hover:bg-white hover:text-red-500"
              >
                Cancelar
              </button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
