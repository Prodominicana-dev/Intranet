import React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Button() {
  const { user, isLoading } = useUser();
  // Extraer ruta actual
  const router = useRouter();
  // Base URL
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (isLoading) return;

  if (user && !isLoading) {
    return (
      <div className="flex justify-center items-center">Sesion iniciada</div>
    );
  }
  if (!user && !isLoading) {
    return (
      <div className="flex justify-center items-center">
        <a href={``} className="bg-blue-900 px-10 py-4  text-white rounded-lg">
          Iniciar Sesión
        </a>
      </div>
    );
  }
}
