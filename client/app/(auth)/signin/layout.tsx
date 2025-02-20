"use client";
import { useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import UserContext from "@/context/user.context";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function SignInLayout() {
  const { signInWithGoogle, signInO, user } = useContext(UserContext);
  const { data: session } = useSession();
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Por favor complete todos los campos");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const user = await signInO({
        email: formData.email,
        password: formData.password,
      });
      if (user) {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.message || "Hubo un error al iniciar sesión.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");
    try {
      const user = await signInWithGoogle();
      if (user) {
        router.push("/");
      }
    } catch (err: any) {
      setError("Error al iniciar sesión con Google");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
            Bienvenido de nuevo
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-indigo-200/65"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full mt-1 form-input"
                placeholder="Su email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                aria-describedby={error ? "error-message" : undefined}
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-indigo-200/65"
                >
                  Contraseña
                </label>
                <Link
                  className="text-sm text-indigo-400 transition-colors hover:text-indigo-300"
                  href="/reset-password"
                >
                  ¿Olvidó su contraseña?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full mt-1 form-input"
                placeholder="Su contraseña"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                aria-describedby={error ? "error-message" : undefined}
              />
            </div>
          </div>

          {error && (
            <p
              id="error-message"
              className="p-2 text-sm text-red-500 rounded bg-red-100/10"
              role="alert"
            >
              {error}
            </p>
          )}

          <div className="space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className="btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 text-white hover:bg-[length:100%_150%] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : null}
              {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
            </button>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="flex items-center justify-center w-full text-gray-300 transition-all duration-200 btn bg-gradient-to-b from-gray-800 to-gray-800/60 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              ) : (
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              )}
              Continuar con Google
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="text-sm text-indigo-200/65">
            ¿No posee una cuenta?{" "}
            <Link
              className="font-medium text-indigo-500 transition-colors hover:text-indigo-400"
              href="/signup"
            >
              Registrarse
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
