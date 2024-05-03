import React from "react";

export default function Page() {
  return (
    <div className="w-full min-h-[85vh] flex flex-col p-8">
      <div className="w-full flex flex-col lg:flex-row lg:justify-between">
        <h1 className="text-3xl font-bold text-black">Vacantes</h1>
        <div className="flex flex-row gap-5">
          <button className="bg-blue-900 text-white px-3 py-2 rounded-lg">
            Crear Vacantes
          </button>
        </div>
      </div>
    </div>
  );
}
