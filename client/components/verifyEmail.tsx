"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/user.context";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

export default function VerifyEmail() {
  const { verifyEmail } = useContext(UserContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyUserEmail = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Token de verificación no encontrado");
        return;
      }

      try {
        const response = await verifyEmail(token);
        setStatus("success");
        setMessage(response.message || "Email verificado correctamente");
      } catch (error: any) {
        setStatus("error");
        setMessage(error.message || "Error al verificar el email");
      }
    };

    verifyUserEmail();
  }, [token, verifyEmail]);

  return (
    <section>
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Verificación de Email
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center mx-auto max-w-[400px]">
            {status === "loading" && (
              <div className="flex flex-col items-center">
                <Loader2 className="w-16 h-16 mb-4 text-indigo-500 animate-spin" />
                <p className="text-indigo-200/65">Verificando tu email...</p>
              </div>
            )}

            {status === "success" && (
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="w-16 h-16 mb-4 text-green-500" />
                <p className="mb-6 text-indigo-200/65">{message}</p>
                <Link
                  href="/signin"
                  className="btn bg-gradient-to-t from-indigo-600 to-indigo-500 text-white hover:bg-[length:100%_150%]"
                >
                  Iniciar Sesión
                </Link>
              </div>
            )}

            {status === "error" && (
              <div className="flex flex-col items-center text-center">
                <XCircle className="w-16 h-16 mb-4 text-red-500" />
                <p className="mb-6 text-red-400">{message}</p>
                <Link
                  href="/signup"
                  className="btn bg-gradient-to-t from-indigo-600 to-indigo-500 text-white hover:bg-[length:100%_150%]"
                >
                  Volver al Registro
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
