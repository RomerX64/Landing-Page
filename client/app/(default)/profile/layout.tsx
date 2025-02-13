"use client";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/user.context";
import { UserPen, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserProfile: React.FC = () => {
  const { user, updateUser, signOut } = useContext(UserContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    company: "",
    password: "",
    telefono: "",
    username: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!user) {
      router?.push("/signin");
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
    setIsEditing(false);
  };

  const handleSignOut = () => {
    signOut();
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <section className="px-2 py-3 mx-auto max-w-7xl">
      <div className="relative w-[75vw] mx-auto overflow-hidden bg-gray-800 shadow-2xl sm:px-6 rounded-2xl flex flex-col">
        {/* Cabecera con icono, nombre, id y empresa */}
        <div className="relative flex flex-wrap items-center justify-between gap-3 px-4 py-6 md:flex-row">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              onClick={handleSignOut}
              className="transition-transform transform hover:scale-110"
            >
              <LogOut size={48} className="text-indigo-200/65" />
            </Link>
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

        {/* Formulario de edición y datos del usuario */}
        <div className="p-4">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
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
              <div className="flex justify-between mt-4">
                <button
                  type="submit"
                  className="px-6 py-3 font-semibold text-white transition-transform transform rounded-lg shadow-md hover:scale-110 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  onClick={toggleEditMode}
                  className="px-4 py-2 text-white transition-transform transform bg-gray-600 rounded-lg hover:bg-gray-700 hover:scale-110"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <p className="block text-gray-300">
                    <strong>Nombre:</strong> {formData.username}
                  </p>
                </div>
                <div>
                  <p className="block text-gray-300">
                    <strong>Email:</strong> {formData.email}
                  </p>
                </div>
                <div>
                  <p className="block text-gray-300">
                    <strong>Teléfono:</strong> {formData.telefono}
                  </p>
                </div>
                <div>
                  <p className="block text-gray-300">
                    <strong>Empresa:</strong> {formData.company}
                  </p>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={toggleEditMode}
                  className="transition-transform transform text-indigo-200/65 hover:scale-110"
                >
                  <UserPen size={35} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
