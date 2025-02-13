"use client";
import React, { useContext } from "react";
import {
  CaptionsOff,
  CheckCircle,
  NotebookPen,
  PauseCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import {
  ISubscripcion,
  SubscriptionStatus,
} from "@/interfaces/Subscripcion.interface";
import { SuscribeContext } from "@/context/Suscribe.context";

const SuscriberProfile: React.FC = () => {
  const { sub } = useContext(SuscribeContext);
  const handleDesub = () => {};
  return (
    sub && (
      <section className="px-2 py-3 mx-auto max-w-7xl">
        <div className="relative w-[75vw] mx-auto overflow-hidden bg-gray-800 shadow-2xl sm:px-6 rounded-2xl flex flex-col">
          <div className="relative flex flex-wrap items-center justify-between gap-3 px-4 py-6 md:flex-row">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                onClick={handleDesub}
                className="transition-transform transform hover:scale-110"
              >
                <CaptionsOff size={48} className="text-red-400" />
              </Link>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-transparent sm:text-4xl bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                    {sub.plan.name}
                  </h2>
                  {sub.status === SubscriptionStatus.ACTIVE ? (
                    <CheckCircle className="mt-1 ml-2 text-green-500" />
                  ) : sub.status === SubscriptionStatus.PAUSED ? (
                    <PauseCircle className="mt-1 ml-2 text-teal-500" />
                  ) : (
                    <XCircle className="mt-1 ml-2 text-red-500" />
                  )}
                </div>
                <p className="text-sm text-indigo-200/65">{sub.id}</p>
              </div>
            </div>
            <p className="w-full text-xl font-bold text-transparent sm:text-2xl bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 md:text-right md:w-auto">
              {sub.plan.precio > 0 ? `$${sub.plan.precio}/m` : "Free"}
            </p>
          </div>

          {/* Fechas y detalles */}
          <div className="p-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <p className="block text-gray-300">
                  <strong>Subscrito: </strong>
                  {sub.fechaInicio.toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="block text-gray-300">
                  <strong>Ultima paga: </strong>
                  {sub.fechaUltimaPaga.toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="block text-gray-300">
                  <strong>Vencimiento: </strong>
                  {sub.fechaVencimiento.toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Botón de editar */}
            <div className="flex justify-end my-4">
              <Link href="/planes">
                <button className="transition-transform transform text-indigo-200/65 hover:scale-110">
                  <NotebookPen size={35} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default SuscriberProfile;
