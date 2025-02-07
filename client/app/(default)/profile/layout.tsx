"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/user.context";
import { User as UserIcon } from "lucide-react";

const UserProfile: React.FC = () => {
  const { user, updateUser } = useContext(UserContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    company: "",
    password: "",
    telefono: "",
    username: "",
  });

  useEffect(() => {
    if (!user) {
      router.push("/signIn");
    } else {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        telefono: user.telefono || "",
        company: user.company || "",
        password: "",
      });
    }
  }, [user, router]);

  if (!user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser({ ...formData, id: user.id });
  };

  return (
    <section className="px-2 py-3 mx-auto max-w-7xl">
      <div className="relative w-[75vw] mx-auto overflow-hidden bg-gray-800 shadow-2xl sm:px-6 rounded-2xl flex flex-col">
        {/* Cabecera con icono, nombre, id y empresa */}
        <div className="relative flex flex-wrap items-center justify-between gap-3 px-4 py-6 md:flex-row">
          <div className="flex items-center gap-3">
            <UserIcon size={48} className="text-indigo-200/65 " />
            <div className="flex flex-col">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                {user.username}
              </h2>
              <p className="text-sm text-indigo-200/65">{user.id}</p>
            </div>
          </div>
          <p className="w-full text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 md:text-right md:w-auto">
            {user.company}
          </p>
        </div>

        {/* Formulario de edición */}
        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="block text-gray-300">Nombre</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-white bg-gray-700 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-white bg-gray-700 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-300">Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-white bg-gray-700 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-300">Empresa</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3 py-2 mt-1 text-white bg-gray-700 rounded-lg"
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-gray-300">
              Contraseña (dejar en blanco para no cambiar)
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-white bg-gray-700 rounded-lg"
              placeholder="********"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-6 py-3 font-semibold text-white transition-all duration-300 rounded-lg shadow-md bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserProfile;
