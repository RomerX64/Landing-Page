"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  CaptionsOff,
  CheckCircle,
  NotebookPen,
  PauseCircle,
  XCircle,
  CircleDotDashed,
} from "lucide-react";
import Link from "next/link";
import {
  ISubscripcion,
  SubscriptionStatus,
} from "@/interfaces/Subscripcion.interface";
import { SubscriptionContext } from "@/context/Suscribe.context";

const SuscriberProfile: React.FC = () => {
  const { sub, fetchSub, desuscribirse } = useContext(SubscriptionContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [subscription, setSubscription] = useState<ISubscripcion | null>(null);
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [cancellationReason, setCancellationReason] = useState<string>("");
  const [cancelLoading, setCancelLoading] = useState<boolean>(false);
  const [cancelSuccess, setCancelSuccess] = useState<boolean>(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  useEffect(() => {
    const getSubscription = async () => {
      setLoading(true);
      const subs = await fetchSub();
      if (subs) {
        setSubscription(subs);
      } else {
        setSubscription(null);
      }
      setLoading(false);
    };

    if (!sub) {
      getSubscription();
    } else {
      setSubscription(sub);
      setLoading(false);
    }
  }, [sub]);

  if (loading) {
    return (
      <section className="py-5 text-center text-gray-400">
        Cargando suscripción...
      </section>
    );
  }

  if (!subscription) {
    return (
      <section className="py-5 text-center text-gray-400">
        No tienes una suscripción activa.
      </section>
    );
  }

  const fechaInicio = subscription.fechaInicio
    ? new Date(subscription.fechaInicio)
    : null;
  const fechaUltimaPaga = subscription.fechaUltimaPaga
    ? new Date(subscription.fechaUltimaPaga)
    : null;
  const fechaVencimiento = subscription.fechaVencimiento
    ? new Date(subscription.fechaVencimiento)
    : null;

  const handleDesub = () => {
    setShowCancelModal(true);
  };

  const handleCancelSubscription = async () => {
    setCancelLoading(true);
    setCancelError(null);

    try {
      const success = await desuscribirse(cancellationReason);

      if (success) {
        setCancelSuccess(true);
        // Actualizamos la suscripción mostrada
        await fetchSub();
      } else {
        setCancelError(
          "No se pudo cancelar la suscripción. Por favor, intenta de nuevo más tarde."
        );
      }
    } catch (error) {
      setCancelError("Error al procesar la cancelación.");
      console.error("Error en cancelación:", error);
    } finally {
      setCancelLoading(false);
    }
  };

  const closeModal = () => {
    setShowCancelModal(false);
    setCancellationReason("");
    setCancelSuccess(false);
    setCancelError(null);
  };

  return (
    <section className="px-2 py-3 mx-auto max-w-7xl">
      <div className="relative w-[75vw] mx-auto overflow-hidden bg-gray-800 shadow-2xl sm:px-6 rounded-2xl flex flex-col">
        <div className="relative flex flex-wrap items-center justify-between gap-3 px-4 py-6 md:flex-row">
          <div className="flex items-center gap-3">
            <button
              onClick={handleDesub}
              className="transition-transform transform hover:scale-110"
            >
              <CaptionsOff size={48} className="text-red-400" />
            </button>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-transparent sm:text-4xl bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                  {subscription.plan?.name}
                </h2>
                <div className="relative group">
                  {subscription.status === SubscriptionStatus.ACTIVE ? (
                    <>
                      <span className="absolute hidden p-1 ml-2 text-sm text-green-500 left-7 group-hover:block">
                        Active
                      </span>
                      <CheckCircle className="mt-1 ml-2 text-green-500" />
                    </>
                  ) : subscription.status === SubscriptionStatus.PAUSED ? (
                    <>
                      <span className="absolute hidden p-1 ml-2 text-sm text-teal-500 left-7 group-hover:block">
                        Paused
                      </span>
                      <PauseCircle className="mt-1 ml-2 text-teal-500" />
                    </>
                  ) : subscription.status === SubscriptionStatus.CANCELLED ? (
                    <>
                      <span className="absolute hidden p-1 ml-2 text-sm text-red-500 left-7 group-hover:block">
                        Cancelled
                      </span>
                      <XCircle className="mt-1 ml-2 text-red-500" />
                    </>
                  ) : subscription.status === SubscriptionStatus.PENDING ? (
                    <>
                      <span className="absolute hidden p-1 ml-2 text-sm text-yellow-500 left-7 group-hover:block">
                        Pending
                      </span>
                      <CircleDotDashed className="mt-1 ml-2 text-yellow-500" />
                    </>
                  ) : subscription.status === SubscriptionStatus.APPROVED ? (
                    <>
                      <span className="absolute hidden p-1 ml-2 text-sm text-blue-500 left-7 group-hover:block">
                        Approved
                      </span>
                      <CheckCircle className="mt-1 ml-2 text-blue-500" />
                    </>
                  ) : subscription.status === SubscriptionStatus.REJECTED ? (
                    <>
                      <span className="absolute hidden p-1 ml-2 text-sm text-gray-500 left-7 group-hover:block">
                        Rejected
                      </span>
                      <XCircle className="mt-1 ml-2 text-gray-500" />
                    </>
                  ) : subscription.status === SubscriptionStatus.EXPIRED ? (
                    <>
                      <span className="absolute hidden p-1 ml-2 text-sm text-indigo-500 left-7 group-hover:block">
                        Expired
                      </span>
                      <XCircle className="mt-1 ml-2 text-indigo-500" />
                    </>
                  ) : (
                    <>
                      <span className="absolute hidden p-1 ml-2 text-sm text-gray-500 left-7 group-hover:block">
                        Unknown
                      </span>
                      <XCircle className="mt-1 ml-2 text-gray-500" />
                    </>
                  )}
                </div>
              </div>
              <p className="text-sm text-indigo-200/65">{subscription.id}</p>
            </div>
          </div>
          <p className="w-full text-xl font-bold text-transparent sm:text-2xl bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 md:text-right md:w-auto">
            {subscription.plan?.precio > 0
              ? `$${subscription.plan?.precio}/m`
              : "Free"}
          </p>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <p className="block text-gray-300">
                <strong>Subscrito: </strong>
                {fechaInicio ? fechaInicio.toLocaleDateString() : "N/A"}
              </p>
            </div>
            <div>
              <p className="block text-gray-300">
                <strong>Última paga: </strong>
                {fechaUltimaPaga ? fechaUltimaPaga.toLocaleDateString() : "N/A"}
              </p>
            </div>
            <div>
              <p className="block text-gray-300">
                <strong>Vencimiento: </strong>
                {fechaVencimiento
                  ? fechaVencimiento.toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            {sub?.database && (
              <div>
                <Link
                  href={"https://google.com"}
                  target="_blank"
                  className="flex items-center gap-1 text-indigo-400 transition-colors duration-200 hover:text-indigo-300"
                >
                  <span>sub?.database</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="inline"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </Link>
              </div>
            )}
          </div>

          <div className="flex justify-end my-4">
            <Link href="/planes">
              <button className="transition-transform transform text-indigo-200/65 hover:scale-110">
                <NotebookPen size={35} />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Modal de cancelación */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 mx-auto bg-gray-800 rounded-lg">
            <h3 className="mb-4 text-xl font-bold text-white">
              Cancelar Suscripción
            </h3>

            {cancelSuccess ? (
              <div className="mb-6">
                <div className="p-4 mb-4 text-green-400 bg-green-900 rounded-md bg-opacity-20">
                  Tu suscripción ha sido cancelada correctamente.
                </div>
                <button
                  onClick={closeModal}
                  className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <>
                <p className="mb-4 text-gray-300">
                  ¿Estás seguro de que deseas cancelar tu suscripción? Perderás
                  acceso a todos los beneficios al final del período actual.
                </p>

                <div className="mb-4">
                  <label
                    htmlFor="cancellationReason"
                    className="block mb-2 text-sm font-medium text-gray-300"
                  >
                    Motivo de cancelación (opcional)
                  </label>
                  <textarea
                    id="cancellationReason"
                    value={cancellationReason}
                    onChange={(e) => setCancellationReason(e.target.value)}
                    className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    rows={3}
                    placeholder="¿Por qué deseas cancelar tu suscripción?"
                  ></textarea>
                </div>

                {cancelError && (
                  <div className="p-4 mb-4 text-red-400 bg-red-900 rounded-md bg-opacity-20">
                    {cancelError}
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 font-bold text-white bg-gray-600 rounded hover:bg-gray-700"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCancelSubscription}
                    disabled={cancelLoading}
                    className={`flex-1 px-4 py-2 font-bold text-white bg-red-600 rounded hover:bg-red-700 ${
                      cancelLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {cancelLoading ? "Procesando..." : "Confirmar"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default SuscriberProfile;
