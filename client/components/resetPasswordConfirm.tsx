"use client";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "@/context/user.context";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Loader2,
  CheckCircle,
  XCircle,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react";

export const ResetPasswordConfirm = () => {
  const { resetPassword } = useContext(UserContext);
  const router = useRouter();
  const params = useParams();
  const token = params?.slug as string;

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validToken, setValidToken] = useState(true);

  // Validaciones
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    if (!token) {
      setValidToken(false);
      setMessage("Token de restablecimiento no encontrado");
    }
  }, [token]);

  useEffect(() => {
    // Validar longitud de contraseña
    setPasswordValid(newPassword.length >= 5);
    // Validar que las contraseñas coincidan
    setPasswordsMatch(newPassword === confirmPassword);
  }, [newPassword, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setStatus("error");
      setMessage("Token de restablecimiento no encontrado");
      return;
    }

    if (!passwordValid) {
      setStatus("error");
      setMessage("La contraseña debe tener al menos 5 caracteres");
      return;
    }

    if (!passwordsMatch) {
      setStatus("error");
      setMessage("Las contraseñas no coinciden");
      return;
    }

    setStatus("loading");

    try {
      const response = await resetPassword(token, newPassword);
      setStatus("success");
      setMessage(response.message || "Contraseña restablecida correctamente");
      // Redirigir después de 2 segundos
      setTimeout(() => {
        router.push("/signin");
      }, 2000);
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message || "Error al restablecer la contraseña");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!validToken) {
    return (
      <section>
        <div className="max-w-6xl px-4 mx-auto sm:px-6">
          <div className="py-12 md:py-20">
            <div className="flex flex-col items-center justify-center mx-auto max-w-[400px]">
              <XCircle className="w-16 h-16 mb-4 text-red-500" />
              <p className="mb-6 text-red-400">{message}</p>
              <Link
                href="/reset-password"
                className="btn bg-gradient-to-t from-indigo-600 to-indigo-500 text-white hover:bg-[length:100%_150%]"
              >
                Solicitar nuevo restablecimiento
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Establecer nueva contraseña
            </h1>
          </div>

          {status === "success" ? (
            <div className="flex flex-col items-center justify-center mx-auto max-w-[400px]">
              <CheckCircle className="w-16 h-16 mb-4 text-green-500" />
              <p className="mb-6 text-indigo-200/65">{message}</p>
              <p className="text-indigo-200/65">
                Redirigiendo al inicio de sesión...
              </p>
            </div>
          ) : status === "error" ? (
            <div className="flex flex-col items-center justify-center mx-auto max-w-[400px]">
              <XCircle className="w-16 h-16 mb-4 text-red-500" />
              <p className="mb-6 text-red-400">{message}</p>
              {message.includes("expirado") || message.includes("inválido") ? (
                <Link
                  href="/reset-password"
                  className="btn bg-gradient-to-t from-indigo-600 to-indigo-500 text-white hover:bg-[length:100%_150%]"
                >
                  Solicitar nuevo restablecimiento
                </Link>
              ) : (
                <button
                  onClick={() => setStatus("idle")}
                  className="btn bg-gradient-to-t from-indigo-600 to-indigo-500 text-white hover:bg-[length:100%_150%]"
                >
                  Intentar de nuevo
                </button>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto max-w-[400px]">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block mb-1 text-sm font-medium text-indigo-200/65"
                  >
                    Nueva contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      className="w-full pr-10 form-input"
                      placeholder="Mínimo 5 caracteres"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-indigo-200/65"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {!passwordValid && newPassword.length > 0 && (
                    <span className="text-xs text-red-500">
                      La contraseña debe tener al menos 5 caracteres
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-1 text-sm font-medium text-indigo-200/65"
                  >
                    Confirmar contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      className="w-full pr-10 form-input"
                      placeholder="Repita la contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                  {!passwordsMatch && confirmPassword.length > 0 && (
                    <span className="text-xs text-red-500">
                      Las contraseñas no coinciden
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 text-white hover:bg-[length:100%_150%]"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Restablecer contraseña"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
