// Utilizamos dynamic para cargar el componente de forma dinámica
import dynamic from "next/dynamic";
import { Suspense } from "react";

// Importamos el componente de forma dinámica para evitar errores de importación
const Home = dynamic(() => import("./(default)/page"), {
  ssr: true, // Aseguramos que se renderice en el servidor también
});

export default function Page() {
  return (
    <>
      <Suspense fallback={<div>Cargando contenido...</div>}>
        <Home />
      </Suspense>
    </>
  );
}