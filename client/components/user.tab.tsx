"use client";
import { IPlan } from "@/interfaces/Plan.interface";
import { IUser } from "@/interfaces/User.interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import UserModal from "./user.modal";

const UsuariosTab: React.FC<{
  getUsers: () => Promise<IUser[]>;
  planes: IPlan[];
}> = ({ getUsers, planes }) => {
  const router = useRouter();
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

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
  }, []);

  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      user.id?.toLowerCase().includes(searchTerm?.toLowerCase());

    let matchesPlan = true;
    if (selectedPlan !== null) {
      matchesPlan = user.subscripcion?.plan
        ? user.subscripcion.plan.id === selectedPlan
        : false;
    }

    return matchesSearch && matchesPlan;
  });

  // Permitir seleccionar solo un plan a la vez
  const togglePlanSelection = (planId: number) => {
    if (selectedPlan === planId) {
      setSelectedPlan(null);
    } else {
      setSelectedPlan(planId);
    }
  };

  const openModal = (user: IUser) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalOpen(false);
  };

  const redirectToEdit = (userId: string) => {
    router.push(`/user/${userId}`);
  };

  return (
    <div>
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
              // Se añade una clase de ancho fijo (w-32) para que los botones tengan el mismo tamaño
              className={`w-32 px-4 py-2 rounded-lg text-white transition-colors ${
                selectedPlan === plan.id ? "bg-indigo-600" : "bg-gray-700"
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

      {/* Modal de detalles del usuario */}
      {modalOpen && selectedUser && (
        <UserModal
          user={selectedUser}
          onClose={closeModal}
          onEdit={redirectToEdit}
        />
      )}
    </div>
  );
};

export default UsuariosTab;
