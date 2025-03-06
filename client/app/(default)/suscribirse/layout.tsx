"use client";
import React, { useContext, useState, useEffect, useRef } from "react";
import { ChevronLeft, AlertCircle } from "lucide-react";
import { CardPayment } from "@mercadopago/sdk-react";
import { useRouter } from "next/navigation";
import { SubscriptionContext } from "@/context/Suscribe.context";
import { PlansContext } from "@/context/Planes.context";
import {
  IAdditionalData,
  ICardPaymentBrickPayer,
  ICardPaymentFormData,
} from "@mercadopago/sdk-react/esm/bricks/cardPayment/type";

const PaymentForm = () => {
  const { suscribirse, sub, isLoading } = useContext(SubscriptionContext);
  const { viewPlan } = useContext(PlansContext);
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  // Referencia para el contenedor del CardPayment
  const paymentContainerRef = useRef<HTMLDivElement>(null);

  // Referencia para mantener el formData
  const formDataRef =
    useRef<ICardPaymentFormData<ICardPaymentBrickPayer> | null>(null);

  // Effect to handle successful subscription and redirect
  useEffect(() => {
    if (sub && sub.id) {
      // Reset progress to full
      setProgress(100);

      // Short delay to allow progress bar to complete visually
      const redirectTimer = setTimeout(() => {
        router.push("/success");
      }, 500);

      return () => clearTimeout(redirectTimer);
    }
  }, [sub, router]);

  // Progress bar effect during payment processing
  useEffect(() => {
    let progressInterval: NodeJS.Timeout;

    if (paymentProcessing) {
      // En lugar de quitar el componente, ocultamos el contenedor con CSS
      if (paymentContainerRef.current) {
        paymentContainerRef.current.style.display = "none";
      }

      progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prevProgress + 10;
        });
      }, 500);
    } else {
      // Volvemos a mostrar el contenedor cuando no está procesando
      if (paymentContainerRef.current) {
        paymentContainerRef.current.style.display = "";
      }
    }

    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [paymentProcessing]);

  const validateCardData = (
    formData: ICardPaymentFormData<ICardPaymentBrickPayer>
  ): boolean => {
    if (!formData.token) {
      setError("Falta el token de la tarjeta.");
      return false;
    }
    if (!formData.payment_method_id) {
      setError("Método de pago no seleccionado.");
      return false;
    }
    if (!formData.payer?.email) {
      setError("Falta el email del pagador.");
      return false;
    }
    return true;
  };

  const handleRetry = () => {
    setError(null);
    setPaymentProcessing(false);
    setProgress(0);
  };

  const handleFormSubmit = async (
    formData: ICardPaymentFormData<ICardPaymentBrickPayer>,
    additionalData?: IAdditionalData
  ): Promise<void> => {
    if (!viewPlan) {
      setError("No se ha seleccionado un plan.");
      return;
    }

    // Guardamos el formData en la referencia
    formDataRef.current = formData;

    if (!validateCardData(formData)) return;

    try {
      const paymentMethodToken = formData.token;

      // Verificamos que el email existe antes de usarlo
      const email = formData.payer?.email;
      if (!email) {
        setError("Falta el email del pagador.");
        return;
      }

      setPaymentProcessing(true);
      setProgress(10);

      const result = await suscribirse(
        viewPlan.id,
        paymentMethodToken,
        email // Ahora TypeScript sabe que email no es undefined
      );

      if (!result.success) {
        setError(result.error || "Hubo un error al procesar la suscripción.");
        setPaymentProcessing(false);
        setProgress(0);
      }
    } catch (error: any) {
      console.error("Error al procesar el pago:", error);
      setError(
        error.message ||
          "Hubo un error al procesar el pago. Intenta nuevamente."
      );
      setPaymentProcessing(false);
      setProgress(0);
    }
  };

  return (
    <section className="w-10/12 max-w-3xl px-1 py-5 mx-auto">
      {/* Progress bar */}
      {(paymentProcessing || progress > 0) && (
        <div
          className="fixed top-0 left-0 z-50 h-1 transition-all duration-300 ease-out bg-blue-500"
          style={{ width: `${progress}%` }}
        />
      )}

      <div className="p-8 bg-gray-800 shadow-2xl rounded-2xl">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 mr-4 text-white bg-gray-700 rounded-full hover:bg-gray-600"
            disabled={paymentProcessing || isLoading}
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
          </div>
        )}

        {error && (
          <div className="p-4 mb-4 border border-red-400 rounded-lg bg-red-400/10">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 mt-0.5 mr-2 text-red-400" />
              <div>
                <p className="font-medium text-red-400">{error}</p>
                <button
                  onClick={handleRetry}
                  className="mt-2 text-sm font-medium text-indigo-400 hover:text-indigo-300"
                >
                  Intentar nuevamente
                </button>
              </div>
            </div>
          </div>
        )}

        {paymentProcessing && (
          <div className="py-6 text-center">
            <p className="text-xl text-gray-300">Procesando tu pago...</p>
            <p className="text-gray-400">Por favor, no cierres esta ventana.</p>
          </div>
        )}

        {!paymentProcessing && (
          <div id="cardPaymentBrick_container" ref={paymentContainerRef}>
            <CardPayment
              key="payment-form"
              initialization={{ amount: viewPlan ? viewPlan.precio : 0 }}
              onSubmit={handleFormSubmit}
              onError={(err: any) => {
                console.error("Error en el Brick de Pago:", err);
                setError(
                  err.message ||
                    "Hubo un error al procesar el pago. Intenta nuevamente."
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
        )}
      </div>
    </section>
  );
};

export default PaymentForm;
