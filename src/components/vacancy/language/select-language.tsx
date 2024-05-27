"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import Select from "react-select";
import { useDegrees } from "@/service/rrhh/jobs/vacancy/service";
import { useCareers } from "@/service/rrhh/jobs/vacancy/carriers/service";
import { LanguageLevels, Languages } from "@/data/data";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function SelectLanguage({
  data,
  setData,
  index,
}: {
  data: { language: string; level: number }[];
  setData: any;
  index: number;
}) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const [languagesAvailable, setLanguagesAvailable] =
    useState<any[]>(Languages);

  useEffect(() => {
    if (selectedLanguage && selectedLevel) {
      // Modificar el mismo objeto en lugar de crear uno nuevo (usando el index)
      const newData = [...data];
      newData[index] = { language: selectedLanguage, level: selectedLevel };
      setData(newData);
    }
  }, [selectedLanguage, selectedLevel]);

  useEffect(() => {
    // Cuando se actualiza el data, se actualiza la lista de Languages, quitando los language que ya han sido seleccionados
    setSelectedLanguage(data[index]?.language);
    setSelectedLevel(data[index]?.level);
    const languages = Languages.filter(
      (language) => !data.find((item) => item.language === language.value)
    );
    setLanguagesAvailable(languages);
  }, [data]);

  const handleDelete = () => {
    // Eliminar el objeto del array data y actualizar el state de cantidad y borrarlo de la cantidad de idiomas
    const newData = data.filter((_, i) => i !== index);
    console.log(newData);
    setData(newData);
  };

  return (
    <div className="w-full flex-col lg:flex-row gap-2">
      <div className="w-full flex flex-col lg:flex-row gap-2">
        <div className="w-full lg:w-6/12">
          <Select
            menuPosition="fixed"
            id="type"
            options={languagesAvailable}
            onChange={(e: any) => setSelectedLanguage(e.value)}
            value={Languages.find((item) => item.value === selectedLanguage)}
            required
            aria-errormessage="Selecciona un idioma"
            theme={(theme) => ({
              ...theme,
              borderRadius: 8,
              colors: {
                ...theme.colors,
                primary: "black",
              },
            })}
            placeholder="Selecciona un idioma"
          />
        </div>
        <div className="w-full lg:w-6/12">
          <Select
            required
            aria-errormessage="Selecciona un nivel del idioma"
            menuPosition="fixed"
            id="type"
            options={LanguageLevels}
            onChange={(e: any) => setSelectedLevel(e.value)}
            value={LanguageLevels.find(
              (item) => item.value === data[index]?.level
            )}
            theme={(theme) => ({
              ...theme,
              borderRadius: 8,
              colors: {
                ...theme.colors,
                primary: "black",
              },
            })}
            placeholder="Selecciona el nivel que debe tener sobre el idioma"
          />
        </div>
        {index > 0 && (
          <button
            onClick={handleDelete}
            className="bg-red-600 w-full lg:size-10 justify-center items-center flex rounded-lg"
          >
            <XMarkIcon className="size-6 text-white" />
          </button>
        )}
      </div>
    </div>
  );
}
