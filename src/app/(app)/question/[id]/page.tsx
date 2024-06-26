"use client";
import Card from "@/components/question/option/card";
import { QuestionDialog } from "@/components/question/dialog";
import Sketch from "@/components/sketch";
import { useQuestionOptions } from "@/service/rrhh/jobs/question-option/service";
import { Spinner } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { QuestionOptionDialog } from "@/components/question/option/dialog";

export default function Page({ params: { id } }: any) {
  const { data, isLoading, refetch } = useQuestionOptions(id);
  const [questionOptions, setQuestionOptions] = useState<any>([]);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentMembers = questionOptions?.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(questionOptions?.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (!isLoading && data) {
      setQuestionOptions(data);
      setQuestion(data[0]?.question.question);
    }
  }, [data, isLoading]);

  useEffect(() => {
    refetch().then((e) => {
      // Asignar la data a questionOptions
      setQuestionOptions(e.data);
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
      name: "Agregar Opciones",
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
    { name: "Preguntas", href: "/question" },
    { name: `${question}`, href: `/question/${id}` },
  ];

  const nextEmpty =
    "w-6/12 h-full text-blue-900 bg-white border-2 border-blue-900 rounded-lg justify-center items-center";

  const nextNotEmpty =
    "w-6/12 h-full text-white bg-blue-900 border-2 border-blue-900 hover:bg-white hover:text-blue-900 duration-300 hover:shadow-lg rounded-lg justify-center items-center";

  if (isLoading || !questionOptions) {
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
        title="Opciones de respuesta"
        breadcrumbs={breadcrumbs}
        buttons={buttons}
        handleFilterOpen={() => {}}
      >
        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex justify-between">
            <div className="text-black flex items-center">
              {questionOptions?.length > 0 && (
                <>
                  Mostrando las opciones del{" "}
                  {currentPage === 1 ? 1 : (currentPage - 1) * itemsPerPage + 1}{" "}
                  al{" "}
                  {Math.min(
                    currentPage * itemsPerPage,
                    questionOptions?.length
                  )}{" "}
                  de {questionOptions?.length} totales.
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
              <span>opciones por página.</span>
            </div>
          </div>
          <div>
            <div className="w-full text-black font-bold text-xl">
              {question}
            </div>
            <div className="w-full text-black text-sm">Pregunta</div>
          </div>
          <div className="w-full text-black py-4 flex flex-col gap-3">
            <div className="w-full rounded-lg py-4 bg-gray-200 grid grid-cols-2">
              <div className="text-center">Opciones</div>
              <div className="text-center">Acciones</div>
            </div>
            {currentMembers?.map((option: any, key: number) => {
              return (
                <Card
                  key={key}
                  question={data[0]?.question}
                  option={option}
                  update={handleUpdate}
                />
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
        <QuestionOptionDialog
          question={data[0]?.question}
          open={open}
          handler={handleOpen}
          update={handleUpdate}
        />
      )}
    </>
  );
}
