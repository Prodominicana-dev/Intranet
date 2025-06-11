import { Dialog, DialogBody, Spinner } from "@material-tailwind/react";
import React, { useState } from "react";
import { Montserrat } from "next/font/google";
const monserratStyle = Montserrat({ subsets: ["latin"] });
import UserDataCard from "./UserDataCard";
import { XCircleIcon } from "@heroicons/react/24/solid";

export default function ApplicanDataButton({
  applicantData,
  open,
  handleOpen,
}: {
  applicantData: any;
  open: boolean;
  handleOpen: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  // console.log("Data to be sent:", applicantData);

  //   const handleApprove  = async () => {
  //     try {

  //       await approveApplicant(id as string, handleOpen, update);

  //       await SendEmail(data,update);
  //     } catch (error) {
  //       console.error("Error approving applicant:", error);
  //     }

  //     //if (user && !isLoading) {
  //     //}
  //   };
  return (
    <>
      <Dialog
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        placeholder={undefined}
        open={open}
        handler={handleOpen}
        size="lg"
      >
        <DialogBody
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          style={monserratStyle.style}
          placeholder={undefined}
          className="font-sans text-black"
        >
          <div className="flex flex-col items-center justify-center p-3 gap-6 min-w-60">
            <div className="flex flex-col justify-end md:flex-row w-full gap-3">
              <button
                onClick={handleOpen}
                className="inline-flex items-center justify-center p-2 text-red-500 duration-300 bg-white border-2 border-red-500 rounded-lg hover:shadow-lg hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
            </div>
            <div className=" w-80 lg:w-auto lg:min-w-[80%] xl:min-w-[70%] 2xl:min-w-[60%] px-4 mx-auto">
              <UserDataCard user={applicantData} />
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
