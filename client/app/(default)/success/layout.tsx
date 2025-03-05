"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/user.context";
import { SubscriptionContext } from "@/context/Suscribe.context";
import { Clock, CheckCircle, Info } from "lucide-react";

const SubscriptionSuccess: React.FC = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);
  const { sub } = useContext(SubscriptionContext);

  return (
    <section className="flex items-center justify-center min-h-screen p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-[gradient_6s_linear_infinite]">
          Gracias por suscribirte a {sub?.plan.name}
        </h1>

        <div className="p-5 mt-8 bg-gray-900 rounded-lg shadow-lg">
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-12 h-12 mr-4 text-indigo-400" />
            <p className="pt-5 text-xl text-indigo-200 md:text-2xl">
              Su ambiente se está creando. Esto puede demorar aproximadamente
              48hs.
            </p>
          </div>

          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="w-10 h-10 mr-4 text-green-400" />
            <p className="text-lg text-indigo-200">
              Recibirá los datos cuando se termine en{" "}
              {user?.email || "su correo"}.
            </p>
          </div>

          <div className="p-4 mt-6 bg-gray-800 rounded-md">
            <div className="flex items-start mb-4">
              <Info className="w-8 h-8 mt-1 mr-4 text-blue-400" />
              <div className="text-left">
                <h3 className="mb-2 text-xl font-semibold text-white">
                  Proceso de Aprobación
                </h3>
                <p className="text-indigo-200">
                  Su suscripción será aprobada oficialmente una vez que el
                  ambiente se haya creado completamente. Este proceso incluye la
                  configuración de recursos, verificación de infraestructura y
                  preparación del entorno.
                </p>
              </div>
            </div>

            <div className="text-sm text-indigo-200">
              <h4 className="mb-2 font-semibold text-white">Próximos Pasos:</h4>
              <ul className="list-disc list-inside">
                <li>Espere la confirmación por correo electrónico</li>
                <li>
                  Verifique su bandeja de entrada (incluida la carpeta de spam)
                </li>
                <li>Siga las instrucciones para acceder a su nuevo ambiente</li>
              </ul>
            </div>
          </div>
        </div>

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
