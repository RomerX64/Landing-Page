"use client";
import Link from "next/link";
import { useState, useContext } from "react";
import { UserContext } from "@/context/user.context";
import { useRouter } from "next/navigation";

export default function SignInLayout() {
  const { signIn, user } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  if (user) {
    if (user) router.push("/");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const user = await signIn({ email, password });
      if (user) router.push("/");
    } catch (err: any) {
      setError(err.message || "Hubo un error al iniciar sesión.");
    }
  };

  return (
    <section>
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Bienvenido de nuevo
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="mx-auto max-w-[400px]">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-indigo-200/65"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full form-input"
                  placeholder="Su email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <div className="flex items-center justify-between gap-3 mb-1">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-indigo-200/65"
                  >
                    Contraseña
                  </label>
                  <Link
                    className="text-sm text-gray-600 hover:underline"
                    href="/reset-password"
                  >
                    ¿Olvidó su contraseña?
                  </Link>
                </div>
                <input
                  id="password"
                  type="password"
                  className="w-full form-input"
                  placeholder="Su contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
            <div className="mt-6 space-y-5">
              <button
                type="submit"
                className="btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 text-white hover:bg-[length:100%_150%]"
              >
                Logearse
              </button>
              <Link href="/auth/callback">
                <button
                  type="button"
                  className="w-full mt-2 text-gray-300 btn bg-gradient-to-b from-gray-800 to-gray-800/60"
                >
                  Logearse con Google
                </button>
              </Link>
            </div>
          </form>
          <div className="mt-6 text-sm text-center text-indigo-200/65">
            ¿No posee una cuenta?{" "}
            <Link className="font-medium text-indigo-500" href="/signup">
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
