"use client";
import {
  CheckCircleIcon,
  DocumentTextIcon,
  EyeIcon,
  EyeSlashIcon,
  ListBulletIcon,
  PencilSquareIcon,
  TrashIcon,
  UserIcon,
  XCircleIcon,
  XMarkIcon,
  UserCircleIcon
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";

import { useUser } from "@auth0/nextjs-auth0/client";

import Image from "next/image";

import { deleteQuestion } from "@/service/rrhh/jobs/question/service";
import { Tooltip } from "@material-tailwind/react";
import Link from "next/link";
import { deleteVacancy } from "@/service/rrhh/jobs/vacancy/service";
import { approveApplicant } from "@/service/rrhh/jobs/vacancy/application/service";
import ApproveButton from "./approved";
import DeniedButton from "./denied";
import ApplicanDataButton from "./ApplicantsData";

export default function Card({
  applicant,
  update,
}: {
  applicant: any;
  update: () => void;
}) {
  const { user, isLoading } = useUser();
  const [approveOpen, setApproveOpen] = useState(false);
  const [deniedOpen, setDeniedOpen] = useState(false);
  const [aplicantDtOpen, setAplicantDtOpen] = useState(false);

  const handleApproveOpen = () => {
    setApproveOpen(!approveOpen);
  };

  const handleDeniedOpen = () => {
    setDeniedOpen(!deniedOpen);
  };

  const handleApplicantData = () => {
    setAplicantDtOpen(!aplicantDtOpen);
  };
  // console.log(applicant);
  return (
    <>
      <div className="grid items-center m-1 w-full py-4 grid-cols-3 lg:grid-cols-4 text-center bg-white rounded-lg  ring-2 ring-gray-100">
        <div className="line-clamp-1">{applicant?.user.name}</div>
        <div className="line-clamp-1 w-full flex justify-center">
          <p
            className={`px-4 py-1 w-6/12 rounded-full text-white ${
              applicant?.status === "pending"
                ? "bg-yellow-500"
                : applicant?.status === "approved"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {applicant?.status === "pending"
              ? "Pendiente"
              : applicant?.status === "approved"
              ? "Aprobado"
              : "Rechazado"}
          </p>
        </div>
        <div className="line-clamp-1">
          {new Date(applicant?.createdAt).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
        <div className="flex justify-center space-x-5 ">
          {applicant?.user?.cv?.length > 0 && (
            <Tooltip content="Descargar CV">
              <Link
                href={`${process.env.NEXT_PUBLIC_API_URL}/cv/${applicant.user.id}/${applicant.user.cv[0].name}`}
                target="_blank"
                rel="noreferrer noopener"
                download
                className="flex items-center justify-center text-black hover:text-white hover:bg-orange-500 duration-300 bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
              >
                <DocumentTextIcon className="w-7" />
              </Link>
            </Tooltip>
          )}
          <Tooltip content="Aprobar">
            <button
              disabled={applicant?.status === "approved"}
              onClick={handleApproveOpen}
              className={`${
                applicant?.status !== "approved"
                  ? "flex items-center justify-center text-black hover:text-white hover:bg-blue-900 duration-300 bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
                  : "flex items-center justify-center text-black bg-gray-200 duration-300 rounded-lg w-14 h-14 ring-1 ring-gray-100"
              }`}
            >
              <CheckCircleIcon className="w-7" />
            </button>
          </Tooltip>
          <Tooltip content="Rechazar">
            <button
              disabled={applicant?.status === "denied"}
              onClick={handleDeniedOpen}
              className={`${
                applicant?.status !== "denied"
                  ? "flex items-center justify-center text-black hover:text-white hover:bg-red-500 duration-300 bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
                  : "flex items-center justify-center text-black bg-gray-200 duration-300 rounded-lg w-14 h-14 ring-1 ring-gray-100"
              }`}
            >
              <XCircleIcon className="w-7" />
            </button>
          </Tooltip>
          <Tooltip content="Perfil del aplicante">
            <button
              onClick={handleApplicantData}
             className="flex items-center justify-center text-black hover:text-white hover:bg-gray-700 duration-300 bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
            >
              <UserCircleIcon className="w-7" />
            </button>
          </Tooltip>
        </div>
      </div>
      {approveOpen && (
        <ApproveButton
          handleOpen={handleApproveOpen}
          id={applicant.id}
          name={applicant.user.name}
          email={applicant.user.email}
          open={approveOpen}
          update={update}
        />
      )}

      {deniedOpen && (
        <DeniedButton
          handleOpen={handleDeniedOpen}
          id={applicant.id}
          open={deniedOpen}
          update={update}
        />
      )}

       {aplicantDtOpen && (
        <ApplicanDataButton
          applicantData={applicant}
          open={aplicantDtOpen}
          handleOpen={handleApplicantData}
        />
      )} 

      {/* {deleted && (
        <DeleteButton
          open={deleted}
          value={applicant?.title}
          title="Eliminar Vacante"
          message="¿Estás seguro de que deseas eliminar esta vacante? Se eliminarán todas las aplicaciones asociadas."
          handleOpen={handleDeleteOpen}
          funct={handleDelete}
        />
      )} */}
    </>
  );
}
