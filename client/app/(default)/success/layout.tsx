"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/user.context";
import { SubscriptionContext } from "@/context/Suscribe.context";

const SubscriptionSuccess: React.FC = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { sub } = useContext(SubscriptionContext);

  return (
    <section className="flex items-center justify-center min-h-screen p-4 bg-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <h1
          className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent 
          bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-[gradient_6s_linear_infinite]"
        >
          Gracias por suscribirte a {sub?.plan.name}
        </h1>
        <p className="mt-6 text-xl text-indigo-200 md:text-2xl">
          Su ambiente se está creando. Esto puede demorar aproximadamente 48hs.
        </p>
        <p className="mt-4 text-lg text-indigo-200">
          Recibirá los datos cuando se termine en {user?.email || "su correo"}.
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-8 py-4 mt-8 text-white transition rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90"
        >
          Volver al inicio
        </button>
      </div>
    </section>
  );
};

export default SubscriptionSuccess;
