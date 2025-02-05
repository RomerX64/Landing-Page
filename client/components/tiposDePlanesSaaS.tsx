"use client";

import Image, { StaticImageData } from "next/image";
import WorkflowImg01 from "@/public/images/workflow-01.png";
import WorkflowImg02 from "@/public/images/workflow-02.png";
import WorkflowImg03 from "@/public/images/workflow-03.png";
import Spotlight from "@/components/spotlight";
import { useContext } from "react";
import { SuscribeContext } from "@/context/Suscribe.context";
import { useRouter } from "next/navigation";

interface Plan {
  id: number;
  imagen: StaticImageData;
  alt: string;
  precio: string;
  activos: string;
  descripcion: string;
  popular?: boolean;
}

interface CardPlanProps {
  id: number;
  imagen: StaticImageData;
  alt: string;
  precio: string;
  activos: string;
  descripcion: string;
  popular?: boolean;
}

const CardPlan: React.FC<CardPlanProps> = ({
  id,
  imagen,
  alt,
  precio,
  activos,
  descripcion,
  popular,
}) => {
  const { selectPlan } = useContext(SuscribeContext);
  const router = useRouter();

  // Función para manejar el evento onClick
  const handleClick = async () => {
    const selectedPlan = await selectPlan(id); // Seleccionar el plan
    if (selectedPlan) {
      router.push("/suscribirse"); // Navegar a la página de suscripción
    }
  };

  return (
    <div
      className="relative w-full h-full p-px overflow-hidden transition-all duration-300 ease-in-out transform bg-gray-800 cursor-pointer group/card rounded-2xl hover:scale-105 hover:shadow-2xl"
      onClick={handleClick}
    >
      <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950">
        {/* Indicador de popularidad */}
        {popular && (
          <div className="absolute z-30 px-3 py-1 text-xs font-bold text-black bg-yellow-500 rounded-full shadow-md top-4 left-4">
            Más Vendido
          </div>
        )}

        {/* Flecha de navegación */}
        <div
          className="absolute flex items-center justify-center w-8 h-8 text-gray-200 transition-opacity ease-in-out border rounded-full opacity-0 right-6 top-6 border-gray-700/50 bg-gray-800/65 group-hover/card:opacity-100"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={9}
            height={8}
            fill="none"
          >
            <path
              fill="#F4F4F5"
              d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z"
            />
          </svg>
        </div>

        {/* Imagen del plan */}
        <Image
          className="inline-flex transition-all duration-300 ease-in-out"
          src={imagen}
          width={350}
          height={288}
          alt={alt}
        />

        {/* Contenido del plan */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="btn-sm relative rounded-full px-2.5 py-0.5 text-xs font-bold text-white shadow-sm animate-gradient">
              {precio}
            </span>
            <span className="btn-sm relative rounded-full px-2.5 py-0.5 text-xs font-bold text-white shadow-sm animate-gradient">
              {activos}
            </span>
          </div>
          <p className="mb-4 text-gray-300">{descripcion}</p>
          <button
            type="button"
            className="w-full px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out rounded-lg shadow-md bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 animate-gradient"
          >
            ¡Contrátalo ahora!
          </button>
        </div>
      </div>
    </div>
  );
};

export const TiposDePlanes: React.FC = () => {
  const { planes } = useContext(SuscribeContext);
  // Definimos el tipo de las claves del objeto
  const imagenMap: {
    [key in
      | "workflow-01.png"
      | "workflow-02.png"
      | "workflow-03.png"]: StaticImageData;
  } = {
    "workflow-01.png": WorkflowImg01,
    "workflow-02.png": WorkflowImg02,
    "workflow-03.png": WorkflowImg03,
  };

  return (
    <Spotlight className="grid items-start max-w-sm gap-6 mx-auto group lg:max-w-none lg:grid-cols-3">
      {planes.map((plan) => (
        <CardPlan
          key={plan.id}
          id={plan.id}
          imagen={
            imagenMap[
              plan.imagen as
                | "workflow-01.png"
                | "workflow-02.png"
                | "workflow-03.png"
            ]
          }
          alt={plan.alt}
          precio={plan.precio}
          activos={plan.activos}
          descripcion={plan.descripcion}
          popular={plan.popular}
        />
      ))}
    </Spotlight>
  );
};

// Añadimos la animación de gradiente continua
const style = `
  @keyframes gradientAnimation {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .animate-gradient {
    background-size: 200% 200%;
    animation: gradientAnimation 3s ease infinite;
  }

  .animate-opacity {
    opacity: 0;
    animation: fadeIn 1s ease forwards;
  }

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

export const GlobalStyle = () => {
  return <style dangerouslySetInnerHTML={{ __html: style }} />;
};
