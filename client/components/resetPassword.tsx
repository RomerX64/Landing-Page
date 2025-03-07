"use client";
import { useState, useContext } from "react";
import { UserContext } from "@/context/user.context";

export default function ResetPasswordLayout() {
  const { requestResetPassword } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      // Llama a la función del contexto que envía el correo de reset
      const response = await requestResetPassword(email);
      // Se espera que la respuesta tenga un mensaje de confirmación
      setMessage(response.message);
    } catch (err: any) {
      setError(err.message || "Error al solicitar el reinicio de contraseña");
    }
  };

  return (
    <section>
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="py-12 md:py-20">
          {/* Encabezado de la sección */}
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Reset your password
            </h1>
          </div>
          {/* Formulario de reset de contraseña */}
          <form onSubmit={handleSubmit} className="mx-auto max-w-[400px]">
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-indigo-200/65"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full form-input"
                placeholder="Your work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]"
              >
                Reset Password
              </button>
            </div>
          </form>
          {/* Mensaje de confirmación o error */}
          {message && (
            <div className="mt-4 text-center text-green-500">{message}</div>
          )}
          {error && (
            <div className="mt-4 text-center text-red-500">{error}</div>
          )}
        </div>
      </div>
    </section>
  );
}
