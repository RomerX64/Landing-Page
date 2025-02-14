"use client";
import { UserContext } from "@/context/user.context";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function SignUpLayout() {
  const [newUser, setNewUser] = useState({
    username: "",
    company: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
  });
  const { signUp, mailIsValid, signUpWithGoogle, user } =
    useContext(UserContext);
  const [phoneError, setPhoneError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [lengthError, setLengthError] = useState(false);
  const [emailError, setEmailError] = useState("");
  let debounceTimeout: NodeJS.Timeout;

  const router = useRouter();

  if (user) {
    if (user) router.push("/");
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "telefono") {
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

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewUser({ ...newUser, email: value });
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
      const isValid = await mailIsValid(value);
      if (isValid) {
        setEmailError("Este correo ya está registrado");
      } else {
        setEmailError("");
      }
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneError || passwordError || lengthError || emailError) {
      return;
    }
    try {
      const response = await signUp(newUser);
      // Por ejemplo, podrías mostrar un mensaje indicando que revise su email para confirmar
      console.log("Registro exitoso. Revise su email para confirmar.");
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleGoogle = async () => {
    await signUpWithGoogle();
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
              {/* Campos del formulario */}
              <div>
                <label
                  htmlFor="username"
                  className="block mb-1 text-sm font-medium text-indigo-200/65"
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
                  htmlFor="company"
                  className="block mb-1 text-sm font-medium text-indigo-200/65"
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
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium text-indigo-200/65"
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
                  value={newUser.email}
                  onChange={handleEmailChange}
                />
                {emailError && (
                  <span className="text-xs text-red-500">{emailError}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="telefono"
                  className="block mb-1 text-sm font-medium text-indigo-200/65"
                >
                  Número Telefónico <span className="text-red-500">*</span>
                </label>
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  className="w-full form-input"
                  placeholder="Su número telefónico"
                  required
                  value={newUser.telefono}
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
                  htmlFor="password"
                  className="block text-sm font-medium text-indigo-200/65"
                >
                  Contraseña <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="w-full form-input"
                  placeholder="Contraseña (mínimo 5 caracteres)"
                  required
                  onChange={handlePasswordChange}
                />
                {lengthError && (
                  <span className="text-xs text-red-500">
                    La contraseña debe tener al menos 5 caracteres
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-indigo-200/65"
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
                  <span className="text-xs text-red-500">
                    Las contraseñas no son iguales
                  </span>
                )}
              </div>
            </div>
            <div className="mt-6 space-y-5">
              <button
                type="submit"
                className="btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 text-white hover:bg-[length:100%_150%]"
              >
                Registrarse
              </button>
              <button
                type="button"
                onClick={handleGoogle}
                className="w-full text-gray-300 btn bg-gradient-to-b from-gray-800 to-gray-800/60"
              >
                Logearse con Google
              </button>
            </div>
          </form>
          <div className="mt-6 text-sm text-center text-indigo-200/65">
            ¿Ya posee una cuenta?{" "}
            <Link className="font-medium text-indigo-500" href="/signin">
              Logearse
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
