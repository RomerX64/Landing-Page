"use client";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] =
    useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const subs = await getAllSubscriptions();
      const formattedSubs = subs.map((subscription) => ({
        ...subscription,
        // Verificamos si subscription.user existe; si no, asignamos valores por defecto.
        user: subscription.user
          ? {
              id: subscription.user.id,
              email: subscription.user.email,
            }
          : { id: "N/A", email: "N/A" },
      })) as ISubscripcion[];
      setAllSubscriptions(formattedSubs);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [getAllSubscriptions]);

  const handlePause = async (id: string) => {
    try {
      await updateSubscriptionStatus(id, SubscriptionStatus.PAUSED);
      fetchSubscriptions();
    } catch (error) {
      console.error("Error al actualizar la suscripción:", error);
    }
  };

  const handleActivate = async (id: string) => {
    try {
      await updateSubscriptionStatus(id, SubscriptionStatus.ACTIVE);
      fetchSubscriptions();
    } catch (error) {
      console.error("Error al activar la suscripción:", error);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      await cancelSubscription(id, "Cancelado por admin");
      fetchSubscriptions();
    } catch (error) {
      console.error("Error al cancelar la suscripción:", error);
    }
  };

  // Función para obtener un color basado en el estado
  const getStatusColor = (status: SubscriptionStatus) => {
    switch (status) {
      case SubscriptionStatus.ACTIVE:
        return "bg-green-600";
      case SubscriptionStatus.PAUSED:
        return "bg-blue-600";
      case SubscriptionStatus.CANCELLED:
        return "bg-red-600";
      case SubscriptionStatus.PENDING:
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  // Función para formatear fecha
  const formatDate = (date: Date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString();
  };

  // Filtrar suscripciones
  const filteredSubscriptions = allSubscriptions.filter((sub) => {
    const matchesSearch =
      sub.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sub.mercadopagoSubscriptionId &&
        sub.mercadopagoSubscriptionId
          .toLowerCase()
          .includes(searchTerm.toLowerCase()));

    let matchesStatus = true;
    if (selectedStatus !== null) {
      matchesStatus = sub.status === selectedStatus;
    }

    return matchesSearch && matchesStatus;
  });

  // Función para alternar estado seleccionado
  const toggleStatusSelection = (status: SubscriptionStatus) => {
    if (selectedStatus === status) {
      setSelectedStatus(null);
    } else {
      setSelectedStatus(status);
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-white">Suscripciones</h2>

      {/* Filtros */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row">
        <input
          type="text"
          placeholder="Buscar por ID, email o plan..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 text-white bg-gray-700 rounded-lg"
        />
        <div className="flex flex-wrap gap-4">
          {Object.values(SubscriptionStatus).map((status) => (
            <button
              key={status}
              onClick={() => toggleStatusSelection(status)}
              className={`w-32 px-4 py-2 rounded-lg text-white transition-colors ${
                selectedStatus === status
                  ? getStatusColor(status)
                  : "bg-gray-700"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="w-8 h-8 border-4 rounded-full border-t-indigo-600 animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSubscriptions.length > 0 ? (
            filteredSubscriptions.map((sub: ISubscripcion) => (
              <div key={sub.id} className="p-2 bg-gray-700 rounded-lg shadow">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold text-white truncate">
                    ID: {sub.id}
                  </p>
                  <span
                    className={`px-2 py-1 text-xs font-bold text-white rounded-full ${getStatusColor(
                      sub.status
                    )}`}
                  >
                    {sub.status}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-400">UserId{sub.user.id}</p>
                  <p className="text-xs text-gray-400">
                    Email: {sub.user.email}
                  </p>
                  <p className="text-xs text-gray-400">
                    <span className="font-medium">Plan:</span> {sub.plan.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    <span className="font-medium">Inicio:</span>{" "}
                    {formatDate(sub.fechaInicio)}
                  </p>
                  <p className="text-xs text-gray-400">
                    <span className="font-medium">Último pago:</span>{" "}
                    {formatDate(sub.fechaUltimaPaga)}
                  </p>
                  <p className="text-xs text-gray-400">
                    <span className="font-medium">Vencimiento:</span>{" "}
                    {formatDate(sub.fechaVencimiento)}
                  </p>
                  {sub.mercadopagoSubscriptionId && (
                    <p className="text-xs text-gray-400">
                      <span className="font-medium">MP ID:</span>{" "}
                      <span className="text-xs text-gray-400 truncate">
                        {sub.mercadopagoSubscriptionId}
                      </span>
                    </p>
                  )}
                  {sub.cancellationDate && (
                    <p className="text-xs text-gray-400">
                      <span className="font-medium">Cancelada:</span>{" "}
                      {formatDate(sub.cancellationDate)}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {sub.status === SubscriptionStatus.ACTIVE && (
                    <button
                      onClick={() => handlePause(sub.id)}
                      className="px-3 py-1 text-sm text-white bg-yellow-600 rounded hover:bg-yellow-700"
                    >
                      Pausar
                    </button>
                  )}
                  {sub.status === SubscriptionStatus.PAUSED && (
                    <button
                      onClick={() => handleActivate(sub.id)}
                      className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                    >
                      Activar
                    </button>
                  )}
                  {sub.status === SubscriptionStatus.PENDING && (
                    <>
                      <button
                        onClick={() => handleActivate(sub.id)}
                        className="px-3 py-1 text-sm text-white bg-green-600 rounded hover:bg-green-700"
                      >
                        Aprobar
                      </button>
                      <button
                        onClick={() => handleCancel(sub.id)}
                        className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                  {(sub.status === SubscriptionStatus.ACTIVE ||
                    sub.status === SubscriptionStatus.PAUSED) && (
                    <button
                      onClick={() => handleCancel(sub.id)}
                      className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                    >
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-300 col-span-full">
              No se encontraron suscripciones.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SuscripcionesTab;
