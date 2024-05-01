import {
    EyeIcon,
    EyeSlashIcon,
    PencilSquareIcon,
    TrashIcon,
  } from "@heroicons/react/24/solid";
  import React, { useState } from "react";
  
  import { useUser } from "@auth0/nextjs-auth0/client";
  import DeactiveButton from "../inactive";
  import ActivateButton from "../active";
  import DeleteButton from "../delete";
  
  import Image from "next/image";
  
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
    //   if (user && !isLoading) {
    //     deleteMember(
    //       member.id as string,
    //       handleDeleteOpen,
    //       update,
    //       user.sub as string
    //     );
    //   }
    };
    return (
      <>
        <div className="grid items-center w-full h-24 grid-cols-2 lg:grid-cols-5 p-5 text-center bg-white rounded-lg  ring-2 ring-gray-100">
          <div>{question?.name}</div>
          <div>{question?.type}</div>
          <div className="flex justify-center space-x-5 ">
            <button
              onClick={handleEditOpen}
              className="flex items-center justify-center text-black hover:text-white hover:bg-blue-dark duration-300 bg-white rounded-lg w-14 h-14 ring-1 ring-gray-100"
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
        {/* {editOpen && (
          <MembersEditDialog
            id={member?.id}
            open={editOpen}
            handler={handleEditOpen}
            update={update}
          />
        )} */}
  
        {deleted && (
          <DeleteButton
            open={deleted}
            title="Eliminar Colaborador"
            message="¿Estás seguro de que deseas eliminar este colaborador? Esta acción no se puede deshacer."
            handleOpen={handleDeleteOpen}
            funct={handleDelete}
          />
        )}
      </>
    );
  }
  