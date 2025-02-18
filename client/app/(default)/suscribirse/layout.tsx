"use client";
import React, { useContext } from "react";
import { ChevronLeft } from "lucide-react";
import { CardPayment } from "@mercadopago/sdk-react";
import { useRouter } from "next/navigation";
import { SuscribeContext } from "@/context/Suscribe.context";

const PaymentForm = () => {
  const { viewPlan, suscribirse } = useContext(SuscribeContext);
  const router = useRouter();

  const handleFormSubmit = async (formData: any) => {
    if (!viewPlan) return;
    try {
      const paymentMethodToken = formData.token;

      await suscribirse(viewPlan.id, paymentMethodToken);

      router.push("/suscribirse/success");
    } catch (error) {
      console.error("Error al procesar el pago:", error);
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
              <span className="font-bold">
                ${viewPlan.precio} dólares mensuales
              </span>
              .
            </p>
          </div>
        )}

        <div id="cardPaymentBrick_container"></div>

        <CardPayment
          initialization={{ amount: viewPlan ? viewPlan.precio : 0 }}
          onSubmit={handleFormSubmit}
          onError={(error) => {
            console.error("Error en el Brick de Pago:", error);
          }}
          customization={{
            visual: {
              style: {
                theme: "dark",
              },
            },
          }}
        />
      </div>
    </section>
  );
};

export default PaymentForm;
