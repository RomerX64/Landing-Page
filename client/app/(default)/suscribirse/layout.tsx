"use client";
import React, { useContext, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { CardPayment } from "@mercadopago/sdk-react";
import { useRouter } from "next/navigation";
import { SuscribeContext } from "@/context/Suscribe.context";

const PaymentForm = () => {
  const { viewPlan, suscribirse } = useContext(SuscribeContext);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const validateCardData = (formData: any) => {
    if (!formData.token) {
      setError("Falta el token de la tarjeta.");
      return false;
    }
    if (!formData.payment_method_id) {
      setError("Método de pago no seleccionado.");
      return false;
    }
    return true;
  };

  const handleFormSubmit = async (formData: any) => {
    console.log(formData);
    console.log(formData.payer);
    console.log(formData.payer.email);
    if (!viewPlan) return;

    if (!validateCardData(formData)) return;

    try {
      const paymentMethodToken = formData.token;

      setPaymentProcessing(true);
      await suscribirse(viewPlan.id, paymentMethodToken, formData.payer.email);

      // Show success message and redirect
      router.push("/suscribirse/success");
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      setError("Hubo un error al procesar el pago. Intenta nuevamente.");
    } finally {
      setPaymentProcessing(false);
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
          <div className="mb-3">
            <p className="text-gray-300">
              Estás suscribiéndote al plan{" "}
              <span className="font-bold">{viewPlan.name}</span> por{" "}
              <span className="font-bold">
                ${viewPlan.precio} dólares mensuales
              </span>
              .
            </p>
            {error && <p className="text-xl text-red-400 rounded">{error}</p>}
          </div>
        )}

        <div id="cardPaymentBrick_container"></div>

        <CardPayment
          initialization={{ amount: viewPlan ? viewPlan.precio : 0 }}
          onSubmit={handleFormSubmit}
          onError={(err) => {
            console.error("Error en el Brick de Pago:", err);
            setError(
              error || "Hubo un error al procesar el pago. Intenta nuevamente."
            );
          }}
          customization={{
            visual: {
              style: {
                theme: "dark",
              },
            },
            paymentMethods: {
              types: {
                included: ["credit_card", "debit_card", "prepaid_card"],
              },
              minInstallments: 1,
              maxInstallments: 12,
            },
          }}
        />
      </div>
    </section>
  );
};

export default PaymentForm;
