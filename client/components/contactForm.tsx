"use client";
import UserContext from "@/context/user.context";
import api from "@/utils/Api";
import { handleAsync } from "@/utils/error.helper";
import { useContext, useEffect, useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    message: "",
    name: "",
  });
  const [status, setStatus] = useState({
    submitted: false,
    error: false,
    message: "",
  });
  const { user } = useContext(UserContext);

  // Actualizar los campos cuando el usuario cambie
  useEffect(() => {
    if (user) {
      setFormData((prevData) => ({
        ...prevData,
        email: user.email || prevData.email,
        name: user.name || prevData.name,
      }));
    }
  }, [user]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await handleAsync(api.post("/contact", formData));

    if (error) {
      setStatus({
        submitted: true,
        error: true,
        message: "Ha ocurrido un error. Por favor intenta de nuevo.",
      });
    } else {
      setStatus({
        submitted: true,
        error: false,
        message:
          "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.",
      });

      // Limpiar el formulario
      setFormData({
        email: user?.email || "",
        message: "",
        name: user?.name || "",
      });
    }

    setLoading(false);
  };
  return (
    <section className="relative py-6 bg-gray-950">
      <div className="max-w-3xl p-6 px-4 mx-auto bg-gray-900 rounded-xl sm:px-6">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h2
            className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl"
            data-aos="fade-up"
          >
            Contáctanos
          </h2>
          <p
            className="mt-4 text-gray-400"
            data-aos="fade-up"
            data-aos-delay={200}
          >
            Envíanos un mensaje y te responderemos lo antes posible
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            data-aos="fade-up"
            data-aos-delay={300}
          >
            <div>
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-gray-300"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-gray-200 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Tu nombre"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 text-gray-200 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block mb-1 text-sm font-medium text-gray-300"
              >
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 text-gray-200 bg-gray-800 border border-gray-700 rounded-md min-h-20 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full px-6 py-3 text-white font-medium rounded-md ${
                  loading
                    ? "bg-indigo-700 cursor-not-allowed"
                    : "bg-gradient-to-t from-indigo-600 to-indigo-500 hover:bg-[length:100%_150%]"
                } transition-all duration-200 shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)]`}
              >
                {loading ? "Enviando..." : "Enviar mensaje"}
              </button>
            </div>

            {status.submitted && (
              <div
                className={`p-4 rounded-md ${
                  status.error
                    ? "bg-red-900/50 text-red-200"
                    : "bg-green-900/50 text-green-200"
                }`}
                data-aos="fade-up"
              >
                {status.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
