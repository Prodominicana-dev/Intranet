import {
    PencilSquareIcon,
    TrashIcon,
  } from "@heroicons/react/24/solid";
  import React, { useState } from "react";
  
  import { useUser } from "@auth0/nextjs-auth0/client";
  import DeleteButton from "../../delete";
  import { Tooltip } from "@material-tailwind/react";
  import { EditPollDepartmentDialog } from "./edit";
  import { deleteDepartment} from "@/service/rrhh/poll-commitment/department/service";
  
  export default function Card({
    department,
    update,
  }: {
    department: any;
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
        deleteDepartment(department.id as string, handleDeleteOpen, update);
      //}
    };
    return (
      <>
        <div className="grid items-center m-1 w-full py-4 grid-cols-2 text-center bg-white rounded-lg  ring-2 ring-gray-100">
          <div className="line-clamp-1">
            <Tooltip content={department?.name}>{department?.name}</Tooltip>
          </div>
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
          <EditPollDepartmentDialog
           department={department}
            open={editOpen}
            handler={handleEditOpen}
            update={update}
          />
        )}
  
        {deleted && (
          <DeleteButton
            open={deleted}
            value={department?.name}
            title="Eliminar Departamento"
            message="¿Estás seguro de que deseas eliminar este departamento? Esta acción no se puede deshacer."
            handleOpen={handleDeleteOpen}
            funct={handleDelete}
          />
        )}
      </>
    );
  }
  