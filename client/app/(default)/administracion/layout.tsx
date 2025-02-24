"use client";
import PlanesTab from "@/components/plan.tab";
import SuscripcionesTab from "@/components/sub.tab";
import UsuariosTab from "@/components/user.tab";
import { AdminContext } from "@/context/Administracion.context";
import { SuscribeContext } from "@/context/Suscribe.context";
import { useContext, useState } from "react";
const AdminPanel: React.FC = () => {
  const { planes } = useContext(SuscribeContext);
  const {
    getUsers,
    getAllPlans,
    deletePlan,
    getAllSubscriptions,
    updateSubscriptionStatus,
    cancelSubscription,
  } = useContext(AdminContext);
  const [activeTab, setActiveTab] = useState<
    "usuarios" | "planes" | "suscripciones"
  >("usuarios");

  return (
    <section className="w-11/12 px-4 py-3 mx-auto max-w-7xl">
      <h1 className="mb-4 text-3xl font-bold text-white">
        Panel de Administración
      </h1>
      <div className="flex gap-2 mb-6">
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
      {activeTab === "usuarios" && (
        <UsuariosTab getUsers={getUsers} planes={planes} />
      )}
      {activeTab === "planes" && (
        <PlanesTab getAllPlans={getAllPlans} deletePlan={deletePlan} />
      )}
      {activeTab === "suscripciones" && (
        <SuscripcionesTab
          getAllSubscriptions={getAllSubscriptions}
          updateSubscriptionStatus={updateSubscriptionStatus}
          cancelSubscription={cancelSubscription}
        />
      )}
    </section>
  );
};

export default AdminPanel;
