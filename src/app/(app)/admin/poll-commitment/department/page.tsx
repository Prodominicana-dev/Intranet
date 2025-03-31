"use client";

import { QuestionDialog } from "@/components/question/dialog";
import Sketch from "@/components/sketch";
import Card from "@/components/poll-commitment/department/card";
import { PollDepartmentDialog } from "@/components/poll-commitment/department/dialog";
import { usePollDepartment} from "@/service/rrhh/poll-commitment/department/service";
import { Spinner } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function Page() {
  const { data, isLoading, refetch } = usePollDepartment();
  const [questions, setQuestions] = useState<any>([]);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentMembers = questions?.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(questions?.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (!isLoading && data) {
      setQuestions(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    refetch().then((e) => {
      // Asignar la data a questions
      setQuestions(e.data);
    });
  }, [refresh]);

  const handleUpdate = () => {
    setRefresh(!refresh);
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  const buttons = [
    {
      name: "Agregar Departamento",
      onClick: handleOpen,
    },
  ];

  const totalOption = [
    { value: 4, label: "4" },
    { value: 8, label: "8" },
    { value: 12, label: "12" },
    { value: 16, label: "16" },
  ];

  const breadcrumbs = [
    { name: "Recursos Humanos" },
    { name: "Encuesta Compromiso", href: "/encuesta" },
    { name: "Departamento", href: "/departamento" },
  ];

  const nextEmpty =
    "w-6/12 h-full text-blue-900 bg-white border-2 border-blue-900 rounded-lg justify-center items-center";

  const nextNotEmpty =
    "w-6/12 h-full text-white bg-blue-900 border-2 border-blue-900 hover:bg-white hover:text-blue-900 duration-300 hover:shadow-lg rounded-lg justify-center items-center";

  if (isLoading) {
    return (
      <div className="w-full min-h-[85vh] flex justify-center items-center">
        <Spinner
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          className="size-7"
        />
      </div>
    );
  }
  return (
    <>
      <Sketch
        title=" Departamento de la encuesta"
        subtitle="RRHH"
        breadcrumbs={breadcrumbs}
        buttons={buttons}
        handleFilterOpen={() => {}}
      >
        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex justify-between">
            <div className="text-black flex items-center">
              {questions?.length > 0 && (
                <>
                  Mostrando las departamento del{" "}
                  {currentPage === 1 ? 1 : (currentPage - 1) * itemsPerPage + 1}{" "}
                  al {Math.min(currentPage * itemsPerPage, questions?.length)}{" "}
                  de {questions?.length} totales.
                </>
              )}
            </div>
            <div className="text-black flex items-center space-x-2">
              <span> Se mostrarán</span>
              <Select
                id="subsection"
                className="w-20"
                menuPlacement="auto"
                options={totalOption}
                defaultValue={totalOption.find(
                  (opt) => opt.value === itemsPerPage
                )}
                onChange={(e) => setItemsPerPage(e?.value as number)}
              />
              <span>Departamento por página.</span>
            </div>
          </div>
          <div className="w-full text-black py-4 flex flex-col gap-3">
            <div className="w-full rounded-lg py-4 bg-gray-200 grid grid-cols-2">
              <div className="text-center">Departamento</div>
              <div className="text-center">Acciones</div>
            </div>
            {currentMembers?.map((department: any, key: number) => {
              return (
                <Card key={key} department={department} update={handleUpdate} />
              );
            })}
            <div className="flex flex-row space-x-4 w-full h-12">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className={`${currentPage === 1 ? nextEmpty : nextNotEmpty}`}
              >
                Anterior
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className={`${
                  currentPage === totalPages ? nextEmpty : nextNotEmpty
                }`}
              >
                Siguiente
              </button>
            </div>
          </div>
        </div>
      </Sketch>
      {open && (
        <PollDepartmentDialog
          open={open}
          handler={handleOpen}
          update={handleUpdate}
        />
      )}
    </>
  );
}
