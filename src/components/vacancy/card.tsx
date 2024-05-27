"use client";
import {
  EyeIcon,
  EyeSlashIcon,
  ListBulletIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";

import { useUser } from "@auth0/nextjs-auth0/client";
import DeleteButton from "../delete";

import Image from "next/image";

import { deleteQuestion } from "@/service/rrhh/jobs/question/service";
import { Tooltip } from "@material-tailwind/react";
import Link from "next/link";
import { EditVacancyDialog } from "./edit";

export default function Card({
  vacancy,
  update,
}: {
  vacancy: any;
  update: () => void;
}) {
  const { user, isLoading } = useUser();
  const [editOpen, setEditOpen] = useState(false);

  const [deleted, setDelete] = useState(false);

  const handleEditOpen = () => {
    setEditOpen(!editOpen);
  };

  const handleDeleteOpen = () => {
    setDelete(!deleted);
  };

  //   const handleDelete = () => {
  //     //if (user && !isLoading) {
  //     deleteCategory(vacancy.id as string, handleDeleteOpen, update);
  //     //}
  //   };
  return (
    <>
      <div className="grid items-center m-1 w-full py-4 grid-cols-3 lg:grid-cols-4 text-center bg-white rounded-lg  ring-2 ring-gray-100">
        <div className="line-clamp-1">{vacancy?.title}</div>
        <div className="line-clamp-1">{vacancy?.category?.name}</div>
        <div className="line-clamp-1">{vacancy?._count?.applications}</div>
        <div className="flex justify-center space-x-5 ">
          <button
            onClick={handleEditOpen}
            className="flex items-center justify-center text-black hover:text-white hover:bg-blue-900 duration-300 bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
          >
            <PencilSquareIcon className="w-7" />
          </button>
          <button
            onClick={handleDeleteOpen}
            className="flex items-center justify-center text-black hover:text-white hover:bg-red-500 duration-300 bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
          >
            <TrashIcon className="w-7" />
          </button>
        </div>
      </div>
      {editOpen && (
        <EditVacancyDialog
          vacancy={vacancy}
          open={editOpen}
          handler={handleEditOpen}
          update={update}
        />
      )}

      {/* {deleted && (
        <DeleteButton
          open={deleted}
          value={vacancy?.title}
          title="Eliminar Categoría"
          message="¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer."
          handleOpen={handleDeleteOpen}
          funct={() => {}}
        />
      )} */}
    </>
  );
}
