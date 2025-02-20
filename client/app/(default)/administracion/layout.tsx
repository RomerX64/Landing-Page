"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AdminContext } from "@/context/Administracion.context";
import { SuscribeContext } from "@/context/Suscribe.context";

interface UserType {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  subscripcion?: {
    plan?: {
      id: number;
      name: string;
    };
  };
  [key: string]: any;
}

interface PlanType {
  id: number;
  name: string;
  descripcion?: string;
  precio: number;
  [key: string]: any;
}

interface SubscriptionType {
  id: string;
  status: string;
  user: { id: string; name: string; email: string };
  plan: { id: number; name: string };
  cancellationReason?: string;
  cancellationDate?: string;
  [key: string]: any;
}

const AdminPanel: React.FC = () => {
  const router = useRouter();
  const { planes } = useContext(SuscribeContext);
  const {
    getUsers,
    putAdmin,
    getAllPlans,
    deletePlan,
    getAllSubscriptions,
    updateSubscriptionStatus,
    cancelSubscription,
  } = useContext(AdminContext);

  // Estado para seleccionar la pestaña activa
  const [activeTab, setActiveTab] = useState<
    "usuarios" | "planes" | "suscripciones"
  >("usuarios");

  // Estados para cada sección
  const [allUsers, setAllUsers] = useState<UserType[]>([]);
  const [allPlans, setAllPlans] = useState<PlanType[]>([]);
  const [allSubscriptions, setAllSubscriptions] = useState<SubscriptionType[]>(
    []
  );

  // Estados para filtros de usuarios
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlans, setSelectedPlans] = useState<number[]>([]);

  // Estados para modal de detalles de usuario
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Cargar datos según la pestaña activa
  useEffect(() => {
    if (activeTab === "usuarios") {
      const fetchUsers = async () => {
        try {
          const users = await getUsers();
          setAllUsers(users);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      fetchUsers();
    } else if (activeTab === "planes") {
      const fetchPlans = async () => {
        try {
          const plans = await getAllPlans();
          setAllPlans(plans);
        } catch (error) {
          console.error("Error fetching plans:", error);
        }
      };
      fetchPlans();
    } else if (activeTab === "suscripciones") {
      const fetchSubscriptions = async () => {
        try {
          const subs = await getAllSubscriptions();
          setAllSubscriptions(subs);
        } catch (error) {
          console.error("Error fetching subscriptions:", error);
        }
      };
      fetchSubscriptions();
    }
  }, [activeTab, getUsers, getAllPlans, getAllSubscriptions]);

  // Filtro de usuarios
  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesPlan = true;
    if (selectedPlans.length > 0) {
      matchesPlan = user.subscripcion?.plan
        ? selectedPlans.includes(user.subscripcion.plan.id)
        : false;
    }

    return matchesSearch && matchesPlan;
  });

  const togglePlanSelection = (planId: number) => {
    setSelectedPlans((prev) =>
      prev.includes(planId)
        ? prev.filter((id) => id !== planId)
        : [...prev, planId]
    );
  };

  const openModal = (user: UserType) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
  };

  const redirectToEdit = (userId: string) => {
    router.push(`/administracion/${userId}`);
  };

  // Render para la pestaña de Usuarios
  const renderUsuariosTab = () => (
    <div>
      {/* Filtros */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row">
        <input
          type="text"
          placeholder="Buscar por nombre, email o ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 text-white bg-gray-700 rounded-lg"
        />
        <div className="flex flex-wrap gap-4">
          {planes.map((plan) => (
            <button
              key={plan.id}
              onClick={() => togglePlanSelection(plan.id)}
              className={`px-4 py-2 rounded-lg text-white transition-colors ${
                selectedPlans.includes(plan.id)
                  ? "bg-indigo-600"
                  : "bg-gray-700"
              }`}
            >
              {plan.name}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => openModal(user)}
              className="relative p-4 transition-colors bg-gray-700 rounded-lg shadow cursor-pointer hover:bg-gray-600"
            >
              <p className="text-lg font-bold text-white">{user.name}</p>
              {user.isAdmin && (
                <div className="absolute flex items-center justify-center w-4 h-4 text-xs font-bold rounded-full top-2 right-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-400 text-neutral-950">
                  A
                </div>
              )}
              <p className="text-gray-300">{user.email}</p>
              <p className="text-sm text-gray-400">ID: {user.id}</p>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-300 col-span-full">
            No se encontraron usuarios.
          </div>
        )}
      </div>
      {/* Modal de detalles de usuario */}
      {modalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-11/12 p-6 bg-gray-800 rounded-lg shadow-lg md:w-1/2 lg:w-1/3">
            <h2 className="mb-4 text-2xl font-bold text-white">
              Detalles del Usuario
            </h2>
            <div className="space-y-2 text-gray-300">
              {Object.entries(selectedUser)
                .filter(([key]) => key !== "password" && key !== "isAdmin")
                .map(([key, value]) => (
                  <div key={key} className="flex">
                    <span className="mr-2 font-bold">{key}:</span>
                    <span>
                      {typeof value === "object"
                        ? JSON.stringify(value)
                        : value}
                    </span>
                  </div>
                ))}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-white transition-all rounded bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              >
                Cerrar
              </button>
              <button
                onClick={() => redirectToEdit(selectedUser.id)}
                className="px-4 py-2 ml-2 text-white transition-all rounded bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                Modificar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Render para la pestaña de Planes
  const renderPlanesTab = () => (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-white">Planes</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {allPlans.length > 0 ? (
          allPlans.map((plan) => (
            <div key={plan.id} className="p-4 bg-gray-700 rounded-lg shadow">
              <p className="text-lg font-bold text-white">{plan.name}</p>
              <p className="text-gray-300">{plan.descripcion}</p>
              <p className="text-gray-300">Precio: ${plan.precio}</p>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => router.push(`/administracion/plan/${plan.id}`)}
                  className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Editar
                </button>
                <button
                  onClick={async () => {
                    try {
                      await deletePlan(plan.id);
                      setAllPlans((prev) =>
                        prev.filter((p) => p.id !== plan.id)
                      );
                    } catch (error) {
                      console.error("Error al eliminar el plan:", error);
                    }
                  }}
                  className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-300 col-span-full">
            No se encontraron planes.
          </div>
        )}
      </div>
      <button
        onClick={() => router.push("/administracion/plan/nuevo")}
        className="px-4 py-2 mt-4 text-white bg-green-600 rounded hover:bg-green-700"
      >
        Agregar Nuevo Plan
      </button>
    </div>
  );

  // Render para la pestaña de Suscripciones
  const renderSuscripcionesTab = () => (
    <div>
      <h2 className="mb-4 text-2xl font-bold text-white">Suscripciones</h2>
      <div className="grid grid-cols-1 gap-4">
        {allSubscriptions.length > 0 ? (
          allSubscriptions.map((sub) => (
            <div key={sub.id} className="p-4 bg-gray-700 rounded-lg shadow">
              <p className="text-lg font-bold text-white">ID: {sub.id}</p>
              <p className="text-gray-300">
                Usuario: {sub.user.email} - {sub.user.name}
              </p>
              <p className="text-gray-300">Plan: {sub.plan.name}</p>
              <p className="text-gray-300">Estado: {sub.status}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={async () => {
                    try {
                      await updateSubscriptionStatus(sub.id, "paused");
                      const subs = await getAllSubscriptions();
                      setAllSubscriptions(subs);
                    } catch (error) {
                      console.error(
                        "Error al actualizar la suscripción:",
                        error
                      );
                    }
                  }}
                  className="px-3 py-1 text-sm text-white bg-yellow-600 rounded hover:bg-yellow-700"
                >
                  Pausar
                </button>
                <button
                  onClick={async () => {
                    try {
                      await cancelSubscription(sub.id, "Cancelado por admin");
                      const subs = await getAllSubscriptions();
                      setAllSubscriptions(subs);
                    } catch (error) {
                      console.error("Error al cancelar la suscripción:", error);
                    }
                  }}
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

  return (
    <section className="px-4 py-3 mx-auto max-w-7xl">
      <h1 className="mb-4 text-3xl font-bold text-white">
        Panel de Administración
      </h1>
      {/* Pestañas de navegación */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("usuarios")}
          className={`px-4 py-2 rounded ${
            activeTab === "usuarios"
              ? "bg-indigo-600"
              : "bg-gray-700 text-white"
          }`}
        >
          Usuarios
        </button>
        <button
          onClick={() => setActiveTab("planes")}
          className={`px-4 py-2 rounded ${
            activeTab === "planes" ? "bg-indigo-600" : "bg-gray-700 text-white"
          }`}
        >
          Planes
        </button>
        <button
          onClick={() => setActiveTab("suscripciones")}
          className={`px-4 py-2 rounded ${
            activeTab === "suscripciones"
              ? "bg-indigo-600"
              : "bg-gray-700 text-white"
          }`}
        >
          Suscripciones
        </button>
      </div>
      {/* Renderizado según la pestaña activa */}
      {activeTab === "usuarios" && renderUsuariosTab()}
      {activeTab === "planes" && renderPlanesTab()}
      {activeTab === "suscripciones" && renderSuscripcionesTab()}
    </section>
  );
};

export default AdminPanel;
