"use client";
import React, { useContext } from "react";
import { SuscribeContext } from "@/context/Suscribe.context";

const PlanDetail: React.FC = () => {
  const { viewPlan } = useContext(SuscribeContext);

  if (!viewPlan) {
    return (
      <section className="px-4 py-12 mx-auto max-w-7xl">
        <p className="text-center text-gray-300">Cargando plan...</p>
      </section>
    );
  }

  return (
    <section className="py-4">
      <div className="max-w-4xl px-4 mx-auto overflow-hidden bg-gray-800 shadow-2xl sm:px-6 rounded-2xl">
        <div className="relative">
          {/* Indicador de popularidad y nombre del plan */}
          {viewPlan.popular && (
            <div className="absolute px-3 py-1 text-xs font-bold text-black bg-yellow-500 rounded-full shadow-md top-4 right-4">
              Más Vendido
            </div>
          )}
          <div
            className={`absolute px-3 py-1 text-xs font-bold text-black bg-yellow-500 rounded-full shadow-md top-4 right-4 ${
                viewPlan.popular ? "mt-9" : ""
            }`}
          >
            {viewPlan.precio}
          </div>

          <h2
            className="absolute text-4xl font-bold text-transparent top-4 left-4 bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
            data-aos="fade-up"
          >
            {viewPlan.name}
          </h2>
        </div>

        <div className="p-4 py-6 my-10">
          <div className="flex items-center gap-4 mb-6">
            <span className="inline-block rounded-full bg-gradient-to-r from-green-500 to-teal-400 px-6 py-2 text-lg font-bold text-white shadow-sm animate-gradient bg-[length:200%_auto]">
              {viewPlan.activos}
            </span>
          </div>

          {/* Descripción del plan */}
          <p
            className="mb-6 text-gray-300"
            data-aos="fade-up"
            data-aos-delay={200}
          >
            {viewPlan.descripcion}
          </p>

          <button
            type="button"
            className="w-full px-6 py-3 font-semibold text-white transition-all duration-300 rounded-lg shadow-md md:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 animate-gradient"
            data-aos="fade-up"
            data-aos-delay={400}
          >
            ¡Suscríbete Ahora!
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default PlanDetail;
