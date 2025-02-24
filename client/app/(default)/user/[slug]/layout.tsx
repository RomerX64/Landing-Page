"use client";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { IUser } from "@/interfaces/User.interface";
import { AdminContext } from "@/context/Administracion.context";

interface EditUserFormData {
  name: string;
  email: string;
  telefono?: string;
  company?: string;
}

const EditUser: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const userId = params?.slug as string;
  const { getUser } = useContext(AdminContext);

  const [userData, setUserData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        setError("ID de usuario no proporcionado");
        setLoading(false);
        return;
      }
      try {
        const user = await getUser(userId);
        if (!user) {
          setError("Usuario no encontrado");
        } else {
          setUserData(user);
        }
      } catch (err) {
        setError("Error al cargar el usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, getUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const formData = new FormData(e.currentTarget);
      const updatedData: EditUserFormData = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        telefono: formData.get("telefono") as string,
        company: formData.get("company") as string,
      };

      if (!userId || !userData) {
        throw new Error("Datos de usuario no disponibles");
      }

      setSuccessMessage("Usuario actualizado exitosamente");
      setUserData((prev) => (prev ? { ...prev, ...updatedData } : null));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al actualizar el usuario"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md p-4 mx-auto mt-8 text-center bg-red-500 rounded-lg">
        <p className="text-white">{error}</p>
      </div>
    );
  }

  return (
    <section className="max-w-3xl px-4 py-6 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white md:text-3xl">
          Editar Usuario
        </h1>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 text-sm text-white transition-colors bg-gray-700 rounded-lg hover:bg-gray-600"
        >
          Volver
        </button>
      </div>

      {successMessage && (
        <div className="p-4 mb-6 text-center bg-green-600 rounded-lg">
          <p className="text-white">{successMessage}</p>
        </div>
      )}

      {userData && (
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 bg-gray-800 rounded-lg shadow-lg"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-white"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                defaultValue={userData.name}
                required
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={userData.email}
                required
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="telefono"
                className="block mb-2 text-sm font-medium text-white"
              >
                Teléfono
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                defaultValue={userData.telefono || ""}
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className="block mb-2 text-sm font-medium text-white"
              >
                Empresa
              </label>
              <input
                type="text"
                id="company"
                name="company"
                defaultValue={userData.company || ""}
                className="w-full px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center w-full px-4 py-2 text-white transition-all rounded bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Actualizando...
                </>
              ) : (
                "Actualizar Usuario"
              )}
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default EditUser;
