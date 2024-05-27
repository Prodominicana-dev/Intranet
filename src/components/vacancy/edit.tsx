"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import Select from "react-select";
import { createVacancy, useDegrees } from "@/service/rrhh/jobs/vacancy/service";
import { useCareers } from "@/service/rrhh/jobs/vacancy/carriers/service";
import {
  Age,
  ExperienceRange,
  LanguageLevels,
  Languages,
  Province,
  YesNo,
} from "@/data/data";
import { PlusIcon } from "@heroicons/react/24/outline";
import SelectLanguage from "./language/select-language";
import { useVacancyCategories } from "@/service/rrhh/jobs/vacancy/category/service";

export function EditVacancyDialog({
  vacancy,
  open,
  handler,
  update,
}: {
  vacancy: any;
  open: boolean;
  handler: () => void;
  update: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ageSelected, setAge] = useState("cualquiera");
  const [languages, setLanguages] = useState([] as any);
  const [needLicense, setNeedLicense] = useState("false");
  const [needVehicle, setNeedVehicle] = useState("false");
  const [provinceSelected, setProvince] = useState("cualquiera");
  const [experience, setExperience] = useState("");
  const [degreesSelected, setDegreesSelected] = useState("");
  const [careersSelected, setCareersSelected] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [options, setOptions] = useState("");
  const [warning, setWarning] = useState(false);
  const [degreeLabel, setDegreeLabel] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const [degreesOptions, setDegreesOptions] = useState([] as any);
  const [careersOptions, setCareersOptions] = useState([] as any);
  const [categoriesOptions, setCategoriesOptions] = useState([] as any);

  const { data: degrees, isLoading: degreesLoading } = useDegrees();
  const { data: careers, isLoading: careersLoading } = useCareers();
  const { data: categories, isLoading: categoriesLoading } =
    useVacancyCategories();

  useEffect(() => {
    setTitle(vacancy.title);
    setDescription(vacancy.description);
    setAge(vacancy.age === null ? "cualquiera" : vacancy.age.toString());
    setLanguages(vacancy.language);
    setNeedLicense(vacancy.hasLicense.toString());
    setNeedVehicle(vacancy.hasVehicule.toString());
    setProvince(vacancy.province);
    setExperience(vacancy.experience);
    setDegreesSelected(vacancy.degreeId);
    setCareersSelected(vacancy.careerId);
    setCategoryId(vacancy.categoryId);
    console.log(vacancy);
  }, [vacancy]);

  useEffect(() => {
    if (!degreesLoading && degrees) {
      // Convertir data a { value: string, label: string }[]
      const options = degrees.map((degree: any) => {
        return {
          value: degree.id,
          label: degree.name,
        };
      });
      setDegreesOptions(options);
    }
  }, [degrees, degreesLoading]);

  useEffect(() => {
    if (!categoriesLoading && categories) {
      // Convertir data a { value: string, label: string }[]
      const options = categories.map((category: any) => {
        return {
          value: category.id,
          label: category.name,
        };
      });
      setCategoriesOptions(options);
    }
  }, [categories, categoriesLoading]);

  useEffect(() => {
    if (!careersLoading && careers) {
      // Convertir data a { value: string, label: string }[]
      const options = careers.map((career: any) => {
        return {
          value: career.id,
          label: career.name,
        };
      });
      setCareersOptions(options);
    }
  }, [careers, careersLoading]);

  const goNext = () => {
    if (activeIndex < steps.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const goBack = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const types = [
    { value: "text", label: "Texto" },
    { value: "select", label: "Opción múltiple" },
  ];

  const steps = [
    {
      content: (
        <>
          <div>
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="name" className="text-black font-2xl font-bold">
                Nombre del puesto <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                required
                aria-errormessage="El nombre es obligatorio"
                placeholder="Escribe el nombre del puesto de la vacante"
                className="px-2 py-2 text-black rounded-lg  ring-1 ring-gray-400"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            {warning && title === "" && (
              <label htmlFor="title" className="text-red-600 font-xs">
                El nombre es obligatorio.
              </label>
            )}
          </div>
          <div>
            <div className="w-full flex flex-col gap-1">
              <label
                htmlFor="description"
                className="text-black font-2xl font-bold"
              >
                Descripción del puesto <span className="text-red-600">*</span>
              </label>
              <textarea
                id="description"
                placeholder="Escribe la descripción del puesto de la vacante"
                className="px-2 py-2 text-black rounded-lg border ring-1 ring-gray-400"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {warning && description === "" && (
              <label htmlFor="title" className="text-red-600 font-xs">
                La descripción es obligatoria.
              </label>
            )}
          </div>
          <div className="w-full flex flex-col gap-5">
            <div className="w-full flex flex-col lg:flex-row gap-2">
              <div className="w-full lg:w-6/12">
                <div className="w-full flex flex-col gap-1">
                  <label
                    htmlFor="type"
                    className="text-black font-2xl font-bold"
                  >
                    Categoría <span className="text-red-600">*</span>
                  </label>
                  <Select
                    menuPosition="fixed"
                    id="type"
                    options={categoriesOptions}
                    onChange={(e: any) => setCategoryId(e.value)}
                    value={categoriesOptions.map((a: any) => {
                      return a.value === categoryId ? a : null;
                    })}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 8,
                      colors: {
                        ...theme.colors,
                        primary: "black",
                      },
                    })}
                    placeholder="Selecciona categoría de la vacante"
                  />
                </div>
                {warning && categoryId === "" && (
                  <label htmlFor="type" className="text-red-600 font-xs">
                    La categoría es obligatoria.
                  </label>
                )}
              </div>
              <div className="w-full lg:w-6/12">
                <div className="w-full flex flex-col gap-1">
                  <label
                    htmlFor="type"
                    className="text-black font-2xl font-bold"
                  >
                    Años mínimo de experiencia{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <Select
                    menuPosition="fixed"
                    id="type"
                    options={ExperienceRange}
                    onChange={(e: any) => setExperience(e.value)}
                    value={ExperienceRange.map((a) => {
                      return a.value === experience ? a : null;
                    })}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 8,
                      colors: {
                        ...theme.colors,
                        primary: "black",
                      },
                    })}
                    placeholder="Selecciona la cantidad de años de experiencia"
                  />
                </div>
                {warning && experience === "" && (
                  <label htmlFor="type" className="text-red-600 font-xs">
                    Se necesita colocar la cantidad de años de experiencia.
                  </label>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-2">
              <div className="w-full lg:w-6/12">
                <div className="w-full flex flex-col gap-1">
                  <label
                    htmlFor="type"
                    className="text-black font-2xl font-bold"
                  >
                    Edad mínima <span className="text-red-600">*</span>
                  </label>
                  <Select
                    menuPosition="fixed"
                    id="type"
                    options={Age}
                    onChange={(e: any) => setAge(e.value)}
                    value={Age.map((a) => {
                      return a.value === ageSelected ? a : null;
                    })}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 8,
                      colors: {
                        ...theme.colors,
                        primary: "black",
                      },
                    })}
                    placeholder="Selecciona la edad mínima"
                  />
                </div>
                {warning && ageSelected === "" && (
                  <label htmlFor="type" className="text-red-600 font-xs">
                    El tipo de pregunta es obligatorio.
                  </label>
                )}
              </div>
              <div className="w-full lg:w-6/12">
                <div className="w-full flex flex-col gap-1">
                  <label
                    htmlFor="type"
                    className="text-black font-2xl font-bold"
                  >
                    ¿Necesita licencia? <span className="text-red-600">*</span>
                  </label>
                  <Select
                    menuPosition="fixed"
                    id="type"
                    options={YesNo}
                    onChange={(e: any) => setNeedLicense(e.value)}
                    value={YesNo.map((a) => {
                      return a.value === needLicense ? a : null;
                    })}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 8,
                      colors: {
                        ...theme.colors,
                        primary: "black",
                      },
                    })}
                    placeholder="Selecciona si necesita licencia"
                  />
                </div>
                {warning && needLicense === "" && (
                  <label htmlFor="type" className="text-red-600 font-xs">
                    Se necesita saber si se requiere licencia.
                  </label>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-2">
              <div className="w-full lg:w-6/12">
                <div className="w-full flex flex-col gap-1">
                  <label
                    htmlFor="type"
                    className="text-black font-2xl font-bold"
                  >
                    ¿Necesita vehículo? <span className="text-red-600">*</span>
                  </label>
                  <Select
                    menuPosition="fixed"
                    id="type"
                    options={YesNo}
                    onChange={(e: any) => setNeedVehicle(e.value)}
                    value={YesNo.map((a) => {
                      return a.value === needVehicle ? a : null;
                    })}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 8,
                      colors: {
                        ...theme.colors,
                        primary: "black",
                      },
                    })}
                    placeholder="Selecciona si lo necesita"
                  />
                </div>
                {warning && needVehicle === "" && (
                  <label htmlFor="type" className="text-red-600 font-xs">
                    Se necesita saber si se requiere vehículo.
                  </label>
                )}
              </div>
              <div className="w-full lg:w-6/12">
                <div className="w-full flex flex-col gap-1">
                  <label
                    htmlFor="type"
                    className="text-black font-2xl font-bold"
                  >
                    Provincia <span className="text-red-600">*</span>
                  </label>
                  <Select
                    menuPosition="fixed"
                    id="type"
                    options={Province}
                    onChange={(e: any) => setProvince(e.value)}
                    value={Province.map((a) => {
                      return a.value === provinceSelected ? a : null;
                    })}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 8,
                      colors: {
                        ...theme.colors,
                        primary: "black",
                      },
                    })}
                    placeholder="Selecciona la provincia de la vacante"
                  />
                </div>
                {warning && provinceSelected === "" && (
                  <label htmlFor="type" className="text-red-600 font-xs">
                    La provincia es obligatoria.
                  </label>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-2">
              <div className="w-full lg:w-6/12">
                <div className="w-full flex flex-col gap-1">
                  <label
                    htmlFor="type"
                    className="text-black font-2xl font-bold"
                  >
                    Grado académico mínimo{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <Select
                    menuPosition="fixed"
                    id="type"
                    options={degreesOptions}
                    onChange={(e: any) => {
                      setDegreesSelected(e.value);
                      setDegreeLabel(e.label);
                    }}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 8,
                      colors: {
                        ...theme.colors,
                        primary: "black",
                      },
                    })}
                    placeholder="Selecciona la edad mínima"
                  />
                </div>
                {warning && degreesSelected === "" && (
                  <label htmlFor="type" className="text-red-600 font-xs">
                    Es necesario colocar el grado académico mínimo.
                  </label>
                )}
              </div>
              <div className="w-full lg:w-6/12">
                <div className="w-full flex flex-col gap-1">
                  <label
                    htmlFor="type"
                    className="text-black font-2xl font-bold"
                  >
                    Licenciatura
                  </label>
                  <Select
                    menuPosition="fixed"
                    id="type"
                    isDisabled={
                      degreeLabel !== "Grado" && degreeLabel !== "Universitario"
                    }
                    options={careersOptions}
                    onChange={(e: any) => setCareersSelected(e.value)}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 8,
                      colors: {
                        ...theme.colors,
                        primary: "black",
                      },
                    })}
                    placeholder="Selecciona la edad mínima"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      content: (
        <div className="flex flex-col gap-2">
          <label className="text-black text-xl font-semibold">
            Idiomas requeridos para el puesto
          </label>
          {/* Repetir el mismo componente el totalLanguages que haya */}
          {languages?.map((lang: any) => (
            <SelectLanguage
              key={lang.name}
              data={languages}
              setData={setLanguages}
              index={languages.indexOf(lang)}
            />
          ))}
          {languages?.length < 4 && (
            <button
              onClick={() => {
                // Agregar un objeto { language: "", level: "" } al array de languages
                setLanguages([...languages, { language: "", level: "" }]);
              }}
              className="w-full flex justify-center items-center hover:bg-gray-100 duration-200 py-2 border border-dashed border-gray-300 rounded-xl"
            >
              <PlusIcon className="size-6" />
            </button>
          )}
        </div>
      ),
    },
  ];

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Revisar si no hay campos vacios
    // Si hay campos vacios, mostrar un mensaje de error
    // Si no, continuar
    if (activeIndex === 0) {
      if (
        title === "" ||
        description === "" ||
        categoryId === "" ||
        experience === "" ||
        ageSelected === "" ||
        needLicense === "" ||
        needVehicle === "" ||
        provinceSelected === "" ||
        degreesSelected === ""
      ) {
        setWarning(true);
        return;
      }
    }

    if (activeIndex === 1) {
      let error = false;
      languages.forEach((lang: any) => {
        if (lang.language === "" || lang.level === "") {
          error = true;
        }
      });

      if (error) {
        setWarning(true);
        return;
      }
    }

    // Revisar si el activeIndex es igual a la cantidad de pasos
    // Si es igual, enviar la data al backend
    // Si no, seguir avanzando
    if (activeIndex === steps.length - 1) {
      // const formData = new FormData();
      // formData.append("title", title);
      // formData.append("description", description);
      // formData.append("categoryId", categoryId);
      // formData.append("experience", experience);
      // formData.append("age", ageSelected);
      // formData.append("hasLicense", needLicense);
      // formData.append("hasVehicule", needVehicle);
      // formData.append("province", provinceSelected);
      // if (careersSelected !== "") formData.append("career", careersSelected);
      // formData.append("degreeId", degreesSelected);
      // formData.append("language", JSON.stringify(languages));

      const data: any = {
        title,
        description,
        categoryId,
        experience,
        age: ageSelected,
        hasLicense: needLicense,
        hasVehicule: needVehicle,
        province: provinceSelected,
        degreeId: degreesSelected,
        language: languages,
      };

      if (careersSelected !== "") {
        data.careerId = careersSelected;
      }

      await createVacancy(data, handler, update);
    } else {
      goNext();
    }
  };

  return (
    <>
      <Dialog
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        placeholder={undefined}
        open={open}
        handler={handler}
        size="lg"
        className="p-2 "
      >
        <DialogHeader
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          placeholder={undefined}
          className="font-semibold flex flex-col items-start gap-1 font-montserrat"
        >
          Agregar vacante
        </DialogHeader>

        <DialogBody
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          placeholder={undefined}
          className="flex flex-col font-montserrat space-y-4 overflow-y-auto no-scrollbar"
        >
          <form className="w-full flex flex-col gap-5" action={handleSubmit}>
            {steps[activeIndex].content}
          </form>
        </DialogBody>
        <DialogFooter
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          placeholder={undefined}
          className="space-x-4 font-montserrat"
        >
          {activeIndex > 0 && activeIndex <= steps.length - 1 && (
            <button
              onClick={goBack}
              className={`${"w-36 h-12 bg-blue-500 border-2 border-blue-500 text-white hover:bg-white hover:text-blue-500 hover:shadow-lg duration-300 rounded-xl flex items-center justify-center"}`}
            >
              Anterior
            </button>
          )}
          {activeIndex === steps.length - 1 && (
            <button
              onClick={handleSubmit}
              className={`${"w-36 h-12 bg-green-500 border-2 border-green-500 text-white hover:bg-white hover:text-green-500 hover:shadow-lg duration-300 rounded-xl flex items-center justify-center"}`}
            >
              {isLoading ? (
                <Spinner
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  className="w-7 h-7"
                />
              ) : (
                "Guardar"
              )}
            </button>
          )}
          {activeIndex < steps.length - 1 && (
            <button
              onClick={handleSubmit}
              className={`${"w-36 h-12 bg-blue-500 border-2 border-blue-500 text-white hover:bg-white hover:text-blue-500 hover:shadow-lg duration-300 rounded-xl flex items-center justify-center"}`}
            >
              Siguiente
            </button>
          )}
        </DialogFooter>
      </Dialog>
    </>
  );
}
