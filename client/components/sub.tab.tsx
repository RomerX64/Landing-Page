"use client"
import {
  ISubscripcion,
  SubscriptionStatus,
} from "@/interfaces/Subscripcion.interface";
import { useEffect, useState } from "react";

const SuscripcionesTab: React.FC<{
  getAllSubscriptions: () => Promise<ISubscripcion[]>;
  updateSubscriptionStatus: (
    id: string,
    status: SubscriptionStatus
  ) => Promise<ISubscripcion>;
  cancelSubscription: (id: string, reason: string) => Promise<ISubscripcion>;
}> = ({
  getAllSubscriptions,
  updateSubscriptionStatus,
  cancelSubscription,
}) => {
  const [allSubscriptions, setAllSubscriptions] = useState<ISubscripcion[]>([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const subs = await getAllSubscriptions();
        const formattedSubs = subs.map((subscription) => ({
          ...subscription,
          user: {
            id: subscription.id, // Ajusta según tu estructura real
            name: "Usuario", // Ajusta según tu estructura real
            email: "email@example.com", // Ajusta según tu estructura real
          },
        })) as ISubscripcion[];
        setAllSubscriptions(formattedSubs);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
      }
    };
    fetchSubscriptions();
  }, [getAllSubscriptions]);

  const handlePause = async (id: string) => {
    try {
      await updateSubscriptionStatus(id, SubscriptionStatus.PAUSED);
      const subs = await getAllSubscriptions();
      const formattedSubs = subs.map((subscription) => ({
        ...subscription,
        user: {
          id: subscription.id,
          name: "Usuario",
          email: "email@example.com",
        },
      })) as ISubscripcion[];
      setAllSubscriptions(formattedSubs);
    } catch (error) {
      console.error("Error al actualizar la suscripción:", error);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      await cancelSubscription(id, "Cancelado por admin");
      const subs = await getAllSubscriptions();
      const formattedSubs = subs.map((subscription) => ({
        ...subscription,
        user: {
          id: subscription.id,
          name: "Usuario",
          email: "email@example.com",
        },
      })) as ISubscripcion[];
      setAllSubscriptions(formattedSubs);
    } catch (error) {
      console.error("Error al cancelar la suscripción:", error);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-white">Suscripciones</h2>
      <div className="grid grid-cols-1 gap-4">
        {allSubscriptions.length > 0 ? (
          allSubscriptions.map((sub: ISubscripcion) => (
            <div key={sub.id} className="p-4 bg-gray-700 rounded-lg shadow">
              <p className="text-lg font-bold text-white">ID: {sub.id}</p>
              <p className="text-gray-300">
                Usuario: {sub.user.email} - {sub.user.name}
              </p>
              <p className="text-gray-300">Plan: {sub.plan.name}</p>
              <p className="text-gray-300">Estado: {sub.status}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handlePause(sub.id)}
                  className="px-3 py-1 text-sm text-white bg-yellow-600 rounded hover:bg-yellow-700"
                >
                  Pausar
                </button>
                <button
                  onClick={() => handleCancel(sub.id)}
                  className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-300">
            No se encontraron suscripciones.
          </div>
        )}
      </div>
    </div>
  );
};

export default SuscripcionesTab;
