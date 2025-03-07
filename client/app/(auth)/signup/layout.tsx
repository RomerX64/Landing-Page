"use client";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserContext } from "@/context/user.context";
import { Loader2, Mail } from "lucide-react";

export default function SignUpLayout() {
  const { signUp, mailIsValid, signUpWithGoogle, user } =
    useContext(UserContext);
  const router = useRouter();

  // Estado del formulario
  const [newUser, setNewUser] = useState({
    username: "",
    company: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    phoneError: false,
    passwordError: false,
    lengthError: false,
    emailError: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  let debounceTimeout: NodeJS.Timeout;

  useEffect(() => {
    if (user && !registrationSuccess) {
      router.push("/");
    }
  }, [user, router, registrationSuccess]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => {
      const updatedUser = { ...prev, [name]: value };
      if (name === "telefono") {
        handlePhoneValidation(value);
      }
      return updatedUser;
    });
  };

  const handlePhoneValidation = (phone: string) => {
    let formattedPhone = phone.replace(/\s+/g, "");
    if (!formattedPhone.startsWith("+54")) {
      formattedPhone = "+" + formattedPhone.replace(/^\+?/, "");
    }
    const phonePattern = /^\+54[1-9]\d{1,14}$/;
    setErrors((prev) => ({
      ...prev,
      phoneError: !phonePattern.test(formattedPhone),
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => {
      const updatedUser = { ...prev, [name]: value };
      const pass = updatedUser.password;
      const confirmPass = updatedUser.confirmPassword;
      const lengthError = pass.length < 5;
      const passwordError = pass !== confirmPass;
      setErrors((prev) => ({
        ...prev,
        passwordError,
        lengthError,
      }));
      return updatedUser;
    });
  };

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewUser((prev) => ({ ...prev, email: value }));
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
      const isValid = await mailIsValid(value);
      setErrors((prev) => ({
        ...prev,
        emailError: isValid ? "Este correo ya está registrado" : "",
      }));
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      errors.phoneError ||
      errors.passwordError ||
      errors.lengthError ||
      errors.emailError
    ) {
      return;
    }
    try {
      setIsLoading(true);
      await signUp(newUser);
      setRegistrationSuccess(true);
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await signUpWithGoogle();
      router.push("/");
    } catch (error) {
      console.error("Error al registrarse con Google", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Si el registro fue exitoso, mostrar un mensaje de verificación
  if (registrationSuccess) {
    return (
      <section>
        <div className="max-w-6xl px-4 mx-auto sm:px-6">
          <div className="py-12 md:py-20">
            <div className="pb-12 text-center">
              <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
                ¡Registro Exitoso!
              </h1>
            </div>
            <div className="flex flex-col items-center justify-center mx-auto max-w-[500px] text-center">
              <Mail className="w-16 h-16 mb-6 text-indigo-500" />
              <h2 className="mb-4 text-xl font-semibold text-indigo-200">
                Verifica tu correo electrónico
              </h2>
              <p className="mb-6 text-indigo-200/65">
                Hemos enviado un correo de verificación a{" "}
                <strong>{newUser.email}</strong>. Por favor, revisa tu bandeja
                de entrada y haz clic en el enlace de verificación para activar
                tu cuenta.
              </p>
              <p className="mb-10 text-sm text-indigo-200/65">
                Si no encuentras el correo, verifica tu carpeta de spam o
                solicita un nuevo correo de verificación.
              </p>
              <Link
                href="/signin"
                className="btn bg-gradient-to-t from-indigo-600 to-indigo-500 text-white hover:bg-[length:100%_150%]"
              >
                Ir a Iniciar Sesión
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
              Crea tu usuario
            </h1>
          </div>
          <form onSubmit={handleSubmit} className="mx-auto max-w-[400px]">
            <div className="space-y-5">
              {/* Campos del formulario */}
              <InputField
                id="username"
                label="Username"
                value={newUser.username}
                onChange={handleOnChange}
                error=""
                required
              />
              <InputField
                id="company"
                label="Nombre de Compañía"
                value={newUser.company}
                onChange={handleOnChange}
                error=""
                required
              />
              <InputField
                id="email"
                label="Work Email"
                value={newUser.email}
                onChange={handleEmailChange}
                error={errors.emailError}
                required
                type="email"
              />
              {errors.emailError && <ErrorText>{errors.emailError}</ErrorText>}
              <InputField
                id="telefono"
                label="Número Telefónico"
                value={newUser.telefono}
                onChange={handleOnChange}
                error={
                  errors.phoneError
                    ? "Formato inválido, debe tener el prefijo nacional"
                    : ""
                }
                required
              />
              <PasswordField
                password={newUser.password}
                confirmPassword={newUser.confirmPassword}
                onPasswordChange={handlePasswordChange}
                passwordError={errors.passwordError}
                lengthError={errors.lengthError}
              />
            </div>
            <div className="mt-6 space-y-5">
              <button
                type="submit"
                className="btn w-full bg-gradient-to-t from-indigo-600 to-indigo-500 text-white hover:bg-[length:100%_150%]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Registrarse"
                )}
              </button>
              <button
                type="button"
                onClick={handleGoogleSignUp}
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
                Registrarse con Google
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

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  type?: string;
}

const InputField = ({
  id,
  label,
  value,
  onChange,
  error,
  required,
  type = "text",
}: InputFieldProps) => (
  <div>
    <label
      htmlFor={id}
      className="block mb-1 text-sm font-medium text-indigo-200/65"
    >
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      id={id}
      name={id}
      type={type}
      className="w-full form-input"
      placeholder={`Ingrese su ${label}`}
      value={value}
      onChange={onChange}
      required={required}
    />
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

interface PasswordFieldProps {
  password: string;
  confirmPassword: string;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordError?: boolean;
  lengthError?: boolean;
}

const PasswordField = ({
  password,
  confirmPassword,
  onPasswordChange,
  passwordError,
  lengthError,
}: PasswordFieldProps) => (
  <>
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
        value={password}
        onChange={onPasswordChange}
        required
      />
      {lengthError && (
        <ErrorText>La contraseña debe tener al menos 5 caracteres</ErrorText>
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
        value={confirmPassword}
        onChange={onPasswordChange}
        required
      />
      {passwordError && <ErrorText>Las contraseñas no coinciden</ErrorText>}
    </div>
  </>
);

interface ErrorTextProps {
  children: React.ReactNode;
}

const ErrorText = ({ children }: ErrorTextProps) => (
  <span className="text-xs text-red-500">{children}</span>
);
