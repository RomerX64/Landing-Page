"use client";
import { AdminContext } from "@/context/Administracion.context";
import { SuscribeContext } from "@/context/Suscribe.context";
import React, { useContext, useEffect, useState } from "react";

interface UserType {
  id: string;
  username: string;
  email: string;
  subscripcion?: {
    plan?: {
      id: number;
      name: string;
    };
  };
  // Otros campos que pueda tener el usuario
  [key: string]: any;
}

const AdminPanel: React.FC = () => {
  const { getUsers } = useContext(AdminContext);
  const { planes } = useContext(SuscribeContext);
  const [allUsers, setAllUsers] = useState<UserType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlans, setSelectedPlans] = useState<number[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Cargar usuarios al montar el componente
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUsers();
        setAllUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [getUsers]);

  // Filtrar usuarios según el término de búsqueda y planes seleccionados
  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase());

    let matchesPlan = true;
    if (selectedPlans.length > 0) {
      if (
        user.subscripcion &&
        user.subscripcion.plan &&
        selectedPlans.includes(user.subscripcion.plan.id)
      ) {
        matchesPlan = true;
      } else {
        matchesPlan = false;
      }
    }
    return matchesSearch && matchesPlan;
  });

  // Función para alternar la selección de un plan
  const togglePlanSelection = (planId: number) => {
    if (selectedPlans.includes(planId)) {
      setSelectedPlans((prev) => prev.filter((id) => id !== planId));
    } else {
      setSelectedPlans((prev) => [...prev, planId]);
    }
  };

  const openModal = (user: UserType) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
  };

  return (
    <section className="px-4 py-3 mx-auto max-w-7xl">
      <h1 className="mb-4 text-3xl font-bold">Panel de Administración</h1>

      {/* Filtros */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row">
        <input
          type="text"
          placeholder="Buscar por username, email o ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 text-white bg-gray-700 rounded-lg"
        />

        <div className="flex flex-wrap gap-4">
          {planes.map((plan) => (
            <button
              key={plan.id}
              type="button"
              onClick={() => togglePlanSelection(plan.id)}
              className={`px-4 py-2 rounded-lg text-white cursor-pointer transition-colors ${
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

      {/* Modal para ver detalles del usuario */}
      {modalOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="w-11/12 p-6 bg-gray-800 rounded-lg shadow-lg md:w-1/2 lg:w-1/3"
            style={{
              transform: "scaleX(1.2) scaleY(1.1)",
              transformOrigin: "center",
            }}
          >
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
            <button
              onClick={closeModal}
              className="px-4 py-2 mt-4 text-white transition-all rounded bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminPanel;
