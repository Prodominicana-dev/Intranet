"use client";

import React from "react";
import { useState } from "react";
import { Languages, LanguageLevels } from "@/data/data";

interface UserDataCardProps {
  user: any;
}

export default function UserDataCard({ user }: UserDataCardProps) {
  const [activeTabs, setActiveTabs] = useState("personal");

  const tabs = [
    { id: "personal", label: "Informacion Personales" },
    { id: "relationship", label: "Parentesco" },
    { id: "education", label: "Educación" },
    { id: "Experience", label: "Experiencia" },
    { id: "languages", label: "Idiomas" },
    { id: "PersonalReference", label: "Referencia Personal" },
    { id: "professionalReference", label: "Referencia Profesional" },
  ];

  const dateTransform = (Date: string) => {
    const [year, month, day] = Date.split("T")[0].split("-");
    return `${day}/${month}/${year}`;
  };
  function calcularExperiencia(startDate: string, EndDate: string): number {
    const start = new Date(startDate);
    const end = EndDate ? new Date(EndDate) : new Date();

    const differenceMoths = end.getTime() - start.getTime();

    const mothPerYrs = 1000 * 60 * 60 * 24 * 365.25;
    const ExperienceYrs = differenceMoths / mothPerYrs;

    return Math.floor(ExperienceYrs);
  }

  return (
    <div className="w-full p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <div className=" flex border-b border-gray-200 dark:border-gray-700 ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabs(tab.id)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTabs === tab.id
                ? "text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {activeTabs === "personal" && (
            <>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.name}
                  placeholder="Ingrese su nombre completo"
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Usuario
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.username}
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.email}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Número de teléfono
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.telephone}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Número de teléfono
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.phone}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <span className="capitalize">{user.user.documentType}</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.documentNumber}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Estado civil
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.civilStatus}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fecha de nacimiento
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={dateTransform(user.user.birthdate)}
                  disabled
                />
              </div>
            </>
          )}

          {activeTabs === "relationship" && (
            <>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.personalReference[0]?.name}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Relación
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.personalReference[0]?.relationship}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Teléfono
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.personalReference[0]?.phone}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ¿Trabaja en la empresa?
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={
                    user.user.personalReference.worksInCompany ? "Si" : "No"
                  }
                  disabled
                />
              </div>
            </>
          )}

          {activeTabs === "education" && (
            <>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Institución educativa
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.education[0]?.institution}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Titulo obtenido
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.education[0]?.title}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Area
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.education[0]?.area}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Grado
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.education[0].degrees.name}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fecha de inicio
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={dateTransform(user.user.education[0]?.startDate)}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fecha de finalización
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={dateTransform(user.user.education[0]?.endDate)}
                  disabled
                />
              </div>
            </>
          )}
          {activeTabs === "Experience" && (
            <>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Compañia
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.workExperience[0]?.company}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Posición
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.workExperience[0]?.position}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Area
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.workExperience[0]?.area}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Funciones
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.workExperience[0].functions}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Telefono
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.workExperience[0]?.phone}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fecha de inicio
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={dateTransform(user.user.workExperience[0]?.startDate)}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fecha de finalización
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={dateTransform(user.user.workExperience[0]?.endDate)}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Años de experiencia
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={calcularExperiencia(
                    user.user.workExperience[0]?.startDate,
                    user.user.workExperience[0]?.endDate
                  )}
                  disabled
                />
              </div>
            </>
          )}
          {activeTabs === "languages" && (
            <>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Idioma
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={
                    Languages.find(
                      (l) => l.value === user.user.language[0]?.name
                    )?.label
                  }
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nivel
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={
                    LanguageLevels.find(
                      (l) => l.value === user.user.language[0]?.level
                    )?.label
                  }
                  disabled
                />
              </div>
            </>
          )}
          {activeTabs === "PersonalReference" && (
            <>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.personalReference[0]?.name}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Relación
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.personalReference[0]?.relationship}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Telefono
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.personalReference[0]?.phone}
                  disabled
                />
              </div>
            </>
          )}
          {activeTabs === "professionalReference" && (
            <>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.professionalReference[0]?.name}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Empresa
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.professionalReference[0]?.company}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Posición
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.professionalReference[0]?.position}
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2 w-full mb-5">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Telefono
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  value={user.user.professionalReference[0]?.phone}
                  disabled
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
