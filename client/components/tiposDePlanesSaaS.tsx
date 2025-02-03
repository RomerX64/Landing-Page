"use client";
import Image, { StaticImageData } from "next/image";
import WorkflowImg01 from "@/public/images/workflow-01.png";
import WorkflowImg02 from "@/public/images/workflow-02.png";
import WorkflowImg03 from "@/public/images/workflow-03.png";
import Spotlight from "@/components/spotlight";

// Definición de la interfaz para cada plan
interface Plan {
  id: number;
  imagen: StaticImageData;
  alt: string;
  precio: string;
  activos: string;
  descripcion: string;
  popular?: boolean; // Opcional: marca el plan popular
}

// Datos de cada plan
const planes: Plan[] = [
  {
    id: 1,
    imagen: WorkflowImg01,
    alt: "Workflow 01",
    precio: "Free",
    activos: "300 activos",
    descripcion:
      "Podrá tener todas las funcionalidades del servicio, a excepción de las personalizaciones.",
  },
  {
    id: 2,
    imagen: WorkflowImg02,
    alt: "Workflow 02",
    precio: "$80/anual",
    activos: "500 activos",
    descripcion:
      "En este plan podrá tener todas las funcionalidades, además de personalizaciones en Reportes.",
  },
  {
    id: 3,
    imagen: WorkflowImg03,
    alt: "Workflow 03",
    precio: "$200/anual",
    activos: "2500 activos",
    descripcion:
      "Tendrá todas las funcionalidades, y personalizaciones deseadas.",
    popular: true, // Ahora este es el plan más vendido
  },
  {
    id: 4,
    imagen: WorkflowImg01,
    alt: "Workflow 01",
    precio: "$300/anual",
    activos: "10000 activos",
    descripcion: "Todo lo mencionado.",
  },
  {
    id: 5,
    imagen: WorkflowImg02,
    alt: "Workflow 02",
    precio: "$600/anual",
    activos: "50000 activos",
    descripcion: "Todo lo mencionado.",
  },
  {
    id: 6,
    imagen: WorkflowImg03,
    alt: "Workflow 03",
    precio: "$15000/year",
    activos: "Sin límites",
    descripcion: "Todo lo mencionado.",
  },
];

// Definición de la interfaz para las props del componente CardPlan
interface CardPlanProps {
  imagen: StaticImageData;
  alt: string;
  precio: string;
  activos: string;
  descripcion: string;
  popular?: boolean;
}

// Componente reutilizable para cada tarjeta de plan con efectos adicionales
const CardPlan: React.FC<CardPlanProps> = ({
  imagen,
  alt,
  precio,
  activos,
  descripcion,
  popular,
}) => {
  return (
    <a
      href="/suscribirse"
      className="group/card relative w-full h-full overflow-hidden rounded-2xl bg-gray-800 p-px transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
        before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80
        before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-indigo-500/80
        before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500
        after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64
        after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-indigo-500
        after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 after:hover:opacity-20
        before:group-hover:opacity-100"
    >
      <div
        className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-gray-950
          after:absolute after:inset-0 after:bg-gradient-to-br after:from-gray-900/50 after:via-gray-800/25 after:to-gray-900/50"
      >
        {/* Indicador de popularidad */}
        {popular && (
          <div className="absolute z-30 px-3 py-1 text-xs font-bold text-black bg-yellow-500 rounded-full shadow-md top-4 left-4">
            Más Vendido
          </div>
        )}

        {/* Flecha de navegación */}
        <div
          className="absolute flex items-center justify-center w-8 h-8 text-gray-200 transition-opacity border rounded-full opacity-0 right-6 top-6 border-gray-700/50 bg-gray-800/65 group-hover/card:opacity-100"
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
          className="inline-flex"
          src={imagen}
          width={350}
          height={288}
          alt={alt}
        />

        {/* Contenido del plan */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="btn-sm relative rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm animate-gradient">
              {precio}
            </span>
            <span className="btn-sm relative rounded-full bg-gradient-to-r from-green-500 to-teal-400 px-2.5 py-0.5 text-xs font-bold text-white shadow-sm animate-gradient">
              {activos}
            </span>
          </div>
          <p className="mb-4 text-gray-300">{descripcion}</p>
          {/* Botón de llamada a la acción */}
          <button
            type="button"
            className="w-full px-4 py-2 font-semibold text-white transition-all duration-300 rounded-lg shadow-md bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 animate-gradient"
          >
            ¡Contrátalo ahora!
          </button>
        </div>
      </div>
    </a>
  );
};

// Componente principal que muestra todos los planes
export const TiposDePlanes: React.FC = () => {
  return (
    <>
      <Spotlight className="grid items-start max-w-sm gap-6 mx-auto group lg:max-w-none lg:grid-cols-3">
        {planes.map((plan) => (
          <CardPlan
            key={plan.id}
            imagen={plan.imagen}
            alt={plan.alt}
            precio={plan.precio}
            activos={plan.activos}
            descripcion={plan.descripcion}
            popular={plan.popular}
          />
        ))}
      </Spotlight>
      {/* Estilos para la animación del degradado */}
      <style jsx>{`
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient-x 3s linear infinite;
        }
      `}</style>
    </>
  );
};
