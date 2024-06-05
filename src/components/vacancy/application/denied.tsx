import { XCircleIcon } from "@heroicons/react/24/solid";
import { Dialog, DialogBody, Spinner } from "@material-tailwind/react";
import React, { useState } from "react";
import { Montserrat } from "next/font/google";
import { deniedApplication } from "@/service/rrhh/jobs/vacancy/application/service";
const monserratStyle = Montserrat({ subsets: ["latin"] });

export default function DeniedButton({
  id,
  update,
  open,
  handleOpen,
}: {
  id: string;
  open: boolean;
  update: () => void;
  handleOpen: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = () => {
    //if (user && !isLoading) {
    deniedApplication(id as string, handleOpen, update);
    //}
  };
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
          <div className="flex flex-col items-center justify-center p-3 space-y-12">
            <XCircleIcon className="w-full h-24 text-red-500 md:h-40" />
            <div className="space-y-2">
              <p className="w-full text-lg font-bold md:text-3xl">
                Rechazar la aplicación
              </p>
              <p className="w-full text-xs font-normal md:w-11/12 md:text-base">
                Al confirmar esta acción, el aplicante será notificado de que ha
                sido rechazado.
              </p>
            </div>
            <div className="flex flex-row w-full space-x-3">
              <button
                disabled={isLoading}
                className="w-full h-12 font-normal text-red-500 duration-300 bg-white rounded-lg hover:shadow-lg hover:text-white hover:bg-red-500 border-2 border-red-500 flex items-center justify-center"
                onClick={() => {
                  setIsLoading(true);
                  handleApprove();
                }}
              >
                {isLoading ? (
                  <Spinner
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    className="w-7 h-7"
                  />
                ) : (
                  "Rechazar"
                )}
              </button>
              <button
                onClick={handleOpen}
                className="w-full h-12 font-normal text-red-500 duration-300 bg-white-500 border-2 border-red-500 rounded-lg hover:shadow-lg hover:bg-red-500 hover:text-white"
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
