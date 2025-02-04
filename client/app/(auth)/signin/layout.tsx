"use client";
import Link from "next/link";
import { useState, useContext } from "react";
import { UserContext } from "@/context/user.context";

export default function SignInLayout() {
  const { signIn } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await signIn({ email, password });
      console.log("Usuario logueado:", user);
    } catch (err: any) {
      setError(err.message || "Hubo un error al iniciar sesión.");
    }
  };

  return (
    <section>
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Bienvenido de nuevo
            </h1>
          </div>
          {/* Contact form */}
          <form onSubmit={handleSubmit} className="mx-auto max-w-[400px]">
            <div className="space-y-5">
              <div>
                <label
                  className="block mb-1 text-sm font-medium text-indigo-200/65"
                  htmlFor="email"
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
                    className="block text-sm font-medium text-indigo-200/65"
                    htmlFor="password"
                  >
                    Contraseña
                  </label>
                  <Link
                    className="text-sm text-gray-600 hover:underline"
                    href="/reset-password"
                  >
                    Olvido su contraseña?
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
                className="btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]"
              >
                Logearse
              </button>
              <div className="flex items-center gap-3 text-sm italic text-center text-gray-600 before:h-px before:flex-1 before:bg-gradient-to-r before:from-transparent before:via-gray-400/25 after:h-px after:flex-1 after:bg-gradient-to-r after:from-transparent after:via-gray-400/25">
                o
              </div>
              <button className="btn relative w-full bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.700),theme(colors.gray.800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]">
                Logearse con Google
              </button>
            </div>
          </form>
          {/* Bottom link */}
          <div className="mt-6 text-sm text-center text-indigo-200/65">
            No posee una cuenta?{" "}
            <Link className="font-medium text-indigo-500" href="/signup">
              Registrarse
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
