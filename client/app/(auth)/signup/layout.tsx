"use client";
import Link from "next/link";
import { useState } from "react";

export default function SignUpLayout() {
  const [newUser, setNewUser] = useState({
    username: "",
    company: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [lengthError, setLengthError] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      let formattedPhone = value.replace(/\s+/g, "");

      if (!formattedPhone.startsWith("+54")) {
        formattedPhone = "+" + formattedPhone.replace(/^\+?/, "");
      }

      const phonePattern = /^\+54[1-9]\d{1,14}$/;
      setPhoneError(!phonePattern.test(formattedPhone));
      setNewUser({ ...newUser, [name]: formattedPhone });
    } else {
      setNewUser({ ...newUser, [name]: value });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => {
      const updatedUser = { ...prev, [name]: value };

      const pass = updatedUser.password;
      const confirmPass = updatedUser.confirmPassword;

      setLengthError(pass.length < 5);

      if (pass.length > 0 && confirmPass.length > 0) {
        let mismatchIndex = -1;
        for (let i = 0; i < Math.min(pass.length, confirmPass.length); i++) {
          if (pass[i] !== confirmPass[i]) {
            mismatchIndex = i;
            break;
          }
        }

        if (mismatchIndex === -1) {
          const trimmedPass = pass.trimEnd();
          const trimmedConfirmPass = confirmPass.trimEnd();
          setPasswordError(trimmedPass !== trimmedConfirmPass);
        } else {
          setPasswordError(true);
        }
      } else {
        setPasswordError(false);
      }

      return updatedUser;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones adicionales si es necesario
    if (phoneError || passwordError || lengthError) {
      return;
    }

    try {
      // Reemplaza esta URL con la URL real de tu API o backend
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.ok) {
        // Procesar la respuesta de éxito
        console.log("Usuario registrado exitosamente:", data);
        // Redirigir o mostrar un mensaje de éxito si es necesario
      } else {
        // Manejar el error si la respuesta no es exitosa
        console.error("Error al registrar el usuario:", data);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <section>
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-12 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Crea tu usuario
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto max-w-[400px]">
            <div className="space-y-5">
              {/* Formulario de entrada para cada campo */}
              <div>
                <label
                  className="block mb-1 text-sm font-medium text-indigo-200/65"
                  htmlFor="username"
                >
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  className="w-full form-input"
                  placeholder="Su nombre de usuario"
                  required
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <label
                  className="block mb-1 text-sm font-medium text-indigo-200/65"
                  htmlFor="company"
                >
                  Nombre de Compañía <span className="text-red-500">*</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  className="w-full form-input"
                  placeholder="El nombre de su compañía"
                  required
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <label
                  className="block mb-1 text-sm font-medium text-indigo-200/65"
                  htmlFor="email"
                >
                  Work Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full form-input"
                  placeholder="Su email de trabajo"
                  required
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <label
                  className="block mb-1 text-sm font-medium text-indigo-200/65"
                  htmlFor="phone"
                >
                  Número Telefónico <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full form-input"
                  placeholder="Su número telefónico"
                  required
                  value={newUser.phone}
                  onChange={handleOnChange}
                />
                {phoneError && (
                  <span className="text-xs text-red-500">
                    Formato inválido, debe tener el prefijo nacional
                  </span>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-indigo-200/65"
                  htmlFor="password"
                >
                  Contraseña <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full form-input"
                  placeholder="Contraseña (mayor o igual a 5 caracteres)"
                  required
                  onChange={handlePasswordChange}
                />
                {lengthError && (
                  <label htmlFor="password">
                    <span className="text-red-500">
                      La contraseña debe tener al menos 5 caracteres
                    </span>
                  </label>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-indigo-200/65"
                  htmlFor="confirmPassword"
                >
                  Confirmar contraseña <span className="text-red-500">*</span>
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className="w-full form-input"
                  placeholder="Repita la contraseña"
                  required
                  onChange={handlePasswordChange}
                />
                {passwordError && !lengthError && (
                  <label htmlFor="confirmPassword">
                    <span className="text-red-500">
                      Las contraseñas no son iguales
                    </span>
                  </label>
                )}
              </div>
            </div>
            <div className="mt-6 space-y-5">
              <button
                type="submit"
                className="btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_theme(colors.white/.16)] hover:bg-[length:100%_150%]"
              >
                Registrarse
              </button>
              <div className="flex items-center gap-3 text-sm italic text-center text-gray-600 before:h-px before:flex-1 before:bg-gradient-to-r before:from-transparent before:via-gray-400/25 after:h-px after:flex-1 after:bg-gradient-to-r after:from-transparent after:via-gray-400/25">
                o
              </div>
              <button className="btn relative w-full bg-gradient-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] text-gray-300">
                Logearse con Google
              </button>
            </div>
          </form>

          <div className="mt-6 text-sm text-center text-indigo-200/65">
            Ya posee una cuenta?{" "}
            <Link className="font-medium text-indigo-500" href="/signin">
              Logearse
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
