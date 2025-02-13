"use client";
import React, { useState, useContext } from "react";
import { SuscribeContext } from "@/context/Suscribe.context";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const PaymentForm: React.FC = () => {
  const { viewPlan, suscribirse } = useContext(SuscribeContext);
  const router = useRouter();

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Función simulada para generar un token de pago a partir de los datos de la tarjeta.
  // En producción, integra el SDK de Mercado Pago u otro método de tokenización.
  const generatePaymentToken = (): string => {
    return `token_${cardNumber.slice(-4)}_${expiryMonth}${expiryYear}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!viewPlan) {
      setError("No hay un plan seleccionado.");
      return;
    }

    if (!cardNumber || !cardHolder || !expiryMonth || !expiryYear || !cvv) {
      setError("Por favor completa todos los campos.");
      return;
    }

    setLoading(true);
    try {
      // Generamos el token de pago (simulado)
      const paymentToken = generatePaymentToken();
      // Llamamos a la función de suscribirse del contexto
      await suscribirse(viewPlan.id, paymentToken);
      // Redireccionamos a una pantalla de éxito o mostramos un mensaje
      router.push("/success");
    } catch (err) {
      console.error("Error al procesar el pago:", err);
      setError("Error al procesar el pago. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl px-4 py-12 mx-auto">
      <div className="p-8 bg-gray-800 shadow-2xl rounded-2xl">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 mr-4 text-white bg-gray-700 rounded-full hover:bg-gray-600"
          >
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            Completa tu Pago
          </h2>
        </div>

        {viewPlan && (
          <div className="mb-6">
            <p className="text-gray-300">
              Estás suscribiéndote al plan{" "}
              <span className="font-bold">{viewPlan.name}</span> por{" "}
              <span className="font-bold">${viewPlan.precio} dolares mensuales</span>.
            </p>
          </div>
        )}

        {error && <p className="mb-4 text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300">Número de Tarjeta</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              placeholder="0000 0000 0000 0000"
              className="w-full p-3 mt-1 text-white bg-gray-700 rounded-lg focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300">Nombre del Titular</label>
            <input
              type="text"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              placeholder="Nombre completo"
              className="w-full p-3 mt-1 text-white bg-gray-700 rounded-lg focus:outline-none"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-gray-300">Mes de Expiración</label>
              <input
                type="text"
                value={expiryMonth}
                onChange={(e) => setExpiryMonth(e.target.value)}
                placeholder="MM"
                className="w-full p-3 mt-1 text-white bg-gray-700 rounded-lg focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-300">Año de Expiración</label>
              <input
                type="text"
                value={expiryYear}
                onChange={(e) => setExpiryYear(e.target.value)}
                placeholder="YYYY"
                className="w-full p-3 mt-1 text-white bg-gray-700 rounded-lg focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-300">CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="123"
                className="w-full p-3 mt-1 text-white bg-gray-700 rounded-lg focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-white transition rounded-lg shadow-md bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90"
          >
            {loading ? "Procesando..." : "Confirmar Pago"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default PaymentForm;
