"use client";

import Sketch from "@/components/sketch";
import Card from "@/components/vacancy/carriers/card";
import { VacancyCarriersDialog } from "@/components/vacancy/carriers/dialog";
import { useVacancyCarriers } from "@/service/rrhh/jobs/vacancy/carriers/service";
import { Spinner } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function Page() {
  const { data, isLoading, refetch } = useVacancyCarriers();
  const [carriers, setCarriers] = useState<any>([]);
  const [refresh, setRefresh] = useState(false);
  const [open, setOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentCarriers = carriers?.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(carriers?.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (!isLoading && data) {
      setCarriers(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    refetch().then((e) => {
      // Asignar la data a carriers
      setCarriers(e.data);
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
      name: "Agregar Carrera",
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
    { name: "Vacantes", href: "/Carrera" },
    { name: "Carrera", href: "/Carrera" },
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
        title=" Carrera de Vacantes"
        subtitle="RRHH"
        breadcrumbs={breadcrumbs}
        buttons={buttons}
        handleFilterOpen={() => {}}
      >
        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex justify-between">
            <div className="text-black flex items-center">
              {carriers?.length > 0 && (
                <>
                  Mostrando las Carreras del{" "}
                  {currentPage === 1 ? 1 : (currentPage - 1) * itemsPerPage + 1}{" "}
                  al {Math.min(currentPage * itemsPerPage, carriers?.length)} de{" "}
                  {carriers?.length} totales.
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
              <span>Carreras por página.</span>
            </div>
          </div>
          <div className="w-full text-black py-4 flex flex-col gap-3">
            <div className="w-full rounded-lg py-4 bg-gray-200 grid grid-cols-2">
              <div className="text-center">Carrera</div>
              <div className="text-center">Acciones</div>
            </div>
            {currentCarriers?.map((carriers: any, key: number) => {
              return (
                <Card key={key} carriers={carriers} update={handleUpdate} />
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
        <VacancyCarriersDialog
          open={open}
          handler={handleOpen}
          update={handleUpdate}
        />
      )}
    </>
  );
}
