"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // Importar signIn de next-auth
import { useSearchParams } from "next/navigation"; // Para obtener los parámetros de la URL

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Obtener los parámetros de la URL

  useEffect(() => {
    const code = searchParams.get("code"); // Obtener el valor de "code"

    if (code) {
      // Realizamos la llamada a signIn de next-auth
      signIn("google", {
        callbackUrl: "/",
        redirect: false, // No redirigir automáticamente
        accessToken: code, // Pasa el token recibido a la API
      })
        .then(() => {
          router.push("/"); // Redirige a la página principal
        })
        .catch((error) => {
          console.error("Error al iniciar sesión con Google:", error);
        });
    }
  }, [searchParams, router]);

  return <div className="m-auto">Cargando...</div>;
}
