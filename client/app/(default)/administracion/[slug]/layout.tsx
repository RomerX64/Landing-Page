"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserContext from "@/context/user.context";

interface User {
  id: string;
  name: string;
  email: string;
  telefono?: string;
  company?: string;
  isAdmin: boolean;
}

const EditUser = () => {
  const router = useRouter();
  const { slug } = router.query; // Get the slug from the URL
  const { user } = useContext(UserContext); // Logged-in user
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setUserData(user);
      setLoading(false);
    } else {
      setError("Usuario no encontrado.");
      setLoading(false);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic for updating user details goes here
  };

  // Display loading or error if present
  if (loading)
    return <div className="text-center text-gray-300">Cargando...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <section className="px-4 py-6 mx-auto max-w-7xl">
      <h1 className="mb-4 text-3xl font-bold text-white">Editar Usuario</h1>
      {userData && (
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-gray-800 rounded-lg shadow-lg"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-white">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={userData.name}
              required
              className="w-full px-4 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={userData.email}
              required
              className="w-full px-4 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="telefono" className="block text-white">
              Teléfono
            </label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              defaultValue={userData.telefono || ""}
              className="w-full px-4 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="company" className="block text-white">
              Empresa
            </label>
            <input
              type="text"
              id="company"
              name="company"
              defaultValue={userData.company || ""}
              className="w-full px-4 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-lg"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white transition-all rounded bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Actualizar Usuario
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default EditUser;
