"use client";
import React, { useContext, useEffect } from "react";
import { SuscribeContext } from "@/context/Suscribe.context";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PlanDetail: React.FC = () => {
  const { viewPlan, changePlan } = useContext(SuscribeContext);

  // Detectar eventos del teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        changePlan("prev"); // Cambia al plan anterior
      } else if (event.key === "ArrowRight") {
        changePlan("next"); // Cambia al siguiente plan
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Limpiar el evento cuando el componente se desmonte
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [changePlan]);

  if (!viewPlan) {
    return (
      <section className="px-4 py-12 mx-auto max-w-7xl">
        <p className="text-center text-gray-300">Cargando plan...</p>
      </section>
    );
  }

  const baseFeatures: string[] = [
    "Geolocalización",
    "Reportes contables",
    "Reportes fiscales",
    "Gestión de inventario",
    "Escáneres",
    "Integración de pagos",
    "Soporte técnico",
    "Seguridad avanzada",
    "Acceso móvil",
    "Actualizaciones constantes",
  ];

  const getExtraPersonalizations = (planName: string): string[] => {
    const name = planName.toLowerCase();
    if (name === "megaassets" || name === "assetsgod") {
      return [
        "Personalización en los reportes",
        "Personalización en el diseño de la app",
      ];
    }
    if (name === "unlimit") {
      return [
        "Personalización en los reportes",
        "Personalización en el diseño de la app",
        "Personalización en Funcionalidades",
      ];
    }
    return [];
  };

  const extraPersonalizations = getExtraPersonalizations(viewPlan.name);

  return (
    <section className="px-4 py-3 mx-auto max-w-7xl">
      <div className="relative w-[75vw] h-[95vh] px-4 mx-auto overflow-hidden bg-gray-800 shadow-2xl sm:px-6 rounded-2xl flex flex-col">
        <div className="relative">
          {viewPlan.popular && (
            <div className="absolute px-3 py-1 text-xs font-bold text-black bg-yellow-500 rounded-full shadow-md top-3 right-4">
              Más Vendido
            </div>
          )}
          <div
            className={`absolute px-3 py-1 text-xs font-bold text-black bg-yellow-500 rounded-full shadow-md ${
              viewPlan.popular ? "top-12" : "top-3"
            } right-4`}
          >
            {viewPlan.precio}
          </div>
          <h2 className="absolute text-4xl font-bold text-transparent top-4 left-4 bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            {viewPlan.name}
          </h2>
        </div>

        <div className="flex-grow p-4 mt-10 pt-7">
          <div className="flex items-center gap-4">
            <span className="inline-block px-6 py-2 text-lg font-bold text-white transition-all duration-300 rounded-full shadow-sm bg-gradient-to-r from-green-500 to-teal-400 animate-gradient">
              {viewPlan.activos} activos
            </span>
          </div>

          <div className="flex flex-col mt-2 md:flex-row md:items-start md:gap-6">
            <div className="w-full md:w-1/2">
              <p className="text-gray-300">
                Aprovecha este plan y gestiona hasta {viewPlan.activos} activos al mes
                por tan solo
                <span className="font-bold"> {viewPlan.precio}</span>.
              </p>
              <ul className="pl-6 space-y-2 text-gray-300 list-disc">
                {baseFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            {extraPersonalizations.length > 0 && (
              <div className="hidden w-px mx-4 bg-gray-600 md:block" />
            )}
            {extraPersonalizations.length > 0 && (
              <div className="w-full md:w-1/2">
                <p className="mb-4 text-gray-300">
                  Además, este plan te ofrece:
                </p>
                <ul className="pl-6 space-y-1 text-gray-300 list-disc">
                  {extraPersonalizations.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Contenedor para los botones alineados al final */}
        <div className="flex items-center justify-between px-4 py-6 mt-auto space-x-4">
          <button
            className="p-2 text-white bg-gray-700 rounded-full hover:bg-gray-600"
            onClick={() => changePlan("prev")}
          >
            <ChevronLeft size={24} />
          </button>

          <button className="px-6 py-3 font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-purple-600 to-indigo-600">
            ¡Suscríbete Ahora!
          </button>

          <button
            className="p-2 text-white bg-gray-700 rounded-full hover:bg-gray-600"
            onClick={() => changePlan("next")}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PlanDetail;
