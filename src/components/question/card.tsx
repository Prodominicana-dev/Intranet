import {
  EyeIcon,
  EyeSlashIcon,
  ListBulletIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";

import { useUser } from "@auth0/nextjs-auth0/client";
import DeactiveButton from "../inactive";
import ActivateButton from "../active";
import DeleteButton from "../delete";

import Image from "next/image";
import { EditQuestionDialog } from "./edit";
import { deleteQuestion } from "@/service/rrhh/jobs/question/service";
import { Tooltip } from "@material-tailwind/react";
import Link from "next/link";

export default function Card({
  question,
  update,
}: {
  question: any;
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

  const handleDelete = () => {
    //if (user && !isLoading) {
    deleteQuestion(question.id as string, handleDeleteOpen, update);
    //}
  };
  return (
    <>
      <div className="grid items-center m-1 w-full py-4 grid-cols-2 lg:grid-cols-3 text-center bg-white rounded-lg  ring-2 ring-gray-100">
        <div className="line-clamp-1">
          <Tooltip content={question?.question}>{question?.question}</Tooltip>
        </div>
        <div>
          {question?.type === "text"
            ? "Texto"
            : question?.type === "select" && "Opción múltiple"}
        </div>
        <div className="flex justify-center space-x-5 ">
          {question?.type === "select" && (
            <Link
              href={`/question/${question.id}`}
              className="flex items-center justify-center text-black hover:text-white hover:bg-green-600 duration-300 bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
            >
              <ListBulletIcon className="w-7" />
            </Link>
          )}
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
        <EditQuestionDialog
          questions={question}
          open={editOpen}
          handler={handleEditOpen}
          update={update}
        />
      )}

      {deleted && (
        <DeleteButton
          open={deleted}
          value={question?.question}
          title="Eliminar Pregunta"
          message="¿Estás seguro de que deseas eliminar esta pregunta? Esta acción no se puede deshacer. Además, si esta pregunta tiene opciones, estas también serán eliminadas."
          handleOpen={handleDeleteOpen}
          funct={handleDelete}
        />
      )}
    </>
  );
}
