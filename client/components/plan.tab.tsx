"use client";
import { IPlan } from "@/interfaces/Plan.interface";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PlanesTab: React.FC<{
  getAllPlans: () => Promise<IPlan[]>;
  deletePlan: (id: number) => Promise<void>;
}> = ({ getAllPlans, deletePlan }) => {
  const router = useRouter();
  const [allPlans, setAllPlans] = useState<IPlan[]>([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plans = await getAllPlans();
        setAllPlans(plans);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };
    fetchPlans();
  }, [getAllPlans]);

  const handleDelete = async (id: number) => {
    try {
      await deletePlan(id);
      setAllPlans((prev) => prev?.filter((plan) => plan.id !== id));
    } catch (error) {
      console.error("Error al eliminar el plan:", error);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {allPlans.length > 0 ? (
          allPlans.map((plan) => (
            <div key={plan.id} className="p-4 bg-gray-700 rounded-lg shadow">
              <p className="text-lg font-bold text-white">{plan.name}</p>
              <p className="text-gray-300">{plan.descripcion}</p>
              <p className="text-gray-300">Precio: ${plan.precio}</p>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => router.push(`/administracion/plan/${plan.id}`)}
                  className="px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(plan.id)}
                  className="px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-300 col-span-full">
            No se encontraron planes.
          </div>
        )}
      </div>
      <button
        onClick={() => router.push("/administracion/plan/nuevo")}
        className="px-4 py-2 mt-4 text-white bg-green-600 rounded hover:bg-green-700"
      >
        Agregar Nuevo Plan
      </button>
    </div>
  );
};

export default PlanesTab;
