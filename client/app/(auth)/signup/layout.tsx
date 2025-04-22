"use client";
import { useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserContext } from "@/context/user.context";
import {
  Loader2,
  Mail,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "react-hot-toast"; // Make sure to install this: npm install react-hot-toast

export default function SignUpLayout() {
  const {
    signUp,
    mailIsValid,
    signUpWithGoogle,
    user,
    isLoading: contextLoading,
  } = useContext(UserContext);
  const router = useRouter();

  // Form state
  const [newUser, setNewUser] = useState({
    name: "",
    company: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
  });

  // Error state
  const [errors, setErrors] = useState({
    name: "",
    company: "",
    phoneError: false,
    passwordError: false,
    lengthError: false,
    emailError: "",
    complexityError: false,
  });

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formTouched, setFormTouched] = useState(false);
  const [formStep, setFormStep] = useState(1); // For multi-step form: 1 = basic info, 2 = password

  // Debounce control
  let debounceTimeout: NodeJS.Timeout;

  // Check if user is already logged in
  useEffect(() => {
    if (user && !registrationSuccess) {
      router.push("/");
    }
  }, [user, router, registrationSuccess]);

  // Password validation
  const validatePassword = useCallback((password: string) => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Requires at least 3 of the 4 criteria
    const criteriaCount = [
      hasLowerCase,
      hasUpperCase,
      hasNumber,
      hasSpecialChar,
    ].filter(Boolean).length;
    return criteriaCount >= 3;
  }, []);

  // Handle basic field changes
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (!formTouched) {
      setFormTouched(true);
    }

    setNewUser((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific errors
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // Special validation for phone numbers
    if (name === "telefono") {
      handlePhoneValidation(value);
    }
  };

  // Phone validation
  const handlePhoneValidation = (phone: string) => {
    if (!phone) {
      setErrors((prev) => ({ ...prev, phoneError: false }));
      return;
    }

    let formattedPhone = phone.replace(/\s+/g, "");
    // Ensure it starts with +54 for Argentina
    if (!formattedPhone.startsWith("+")) {
      formattedPhone = "+" + formattedPhone;
    }

    // Support both Argentinian and international formats
    const phonePattern = /^\+(?:[0-9] ?){6,14}[0-9]$/;
    setErrors((prev) => ({
      ...prev,
      phoneError: !phonePattern.test(formattedPhone),
    }));
  };

  // Password change handler
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (!formTouched) {
      setFormTouched(true);
    }

    setNewUser((prev) => ({ ...prev, [name]: value }));

    const isPassword = name === "password";
    const password = isPassword ? value : newUser.password;
    const confirmPassword = isPassword ? newUser.confirmPassword : value;

    // Validate password length, complexity and match
    const lengthError = password.length < 8;
    const passwordError =
      password !== confirmPassword && confirmPassword !== "";
    const complexityError = !validatePassword(password);

    setErrors((prev) => ({
      ...prev,
      passwordError,
      lengthError,
      complexityError,
    }));
  };

  // Email change with debounced validation
  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!formTouched) {
      setFormTouched(true);
    }

    setNewUser((prev) => ({ ...prev, email: value }));

    // Clear any existing email error
    setErrors((prev) => ({ ...prev, emailError: "" }));

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setErrors((prev) => ({
        ...prev,
        emailError: value ? "Formato de correo inválido" : "",
      }));
      return;
    }

    // Debounce the API check
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(async () => {
      try {
        const isRegistered = await mailIsValid(value);
        setErrors((prev) => ({
          ...prev,
          emailError: isRegistered ? "Este correo ya está registrado" : "",
        }));
      } catch (error) {
        console.error("Error checking email:", error);
      }
    }, 500);
  };

  // Check if form is valid to proceed
  const isFormValid = () => {
    // Check if all required fields are filled and valid
    const isStep1Valid =
      newUser.name.trim() !== "" &&
      newUser.company.trim() !== "" &&
      newUser.email.trim() !== "" &&
      !errors.emailError &&
      newUser.telefono.trim() !== "" &&
      !errors.phoneError;

    const isStep2Valid =
      newUser.password.length >= 8 &&
      !errors.complexityError &&
      newUser.password === newUser.confirmPassword;

    return formStep === 1 ? isStep1Valid : isStep2Valid;
  };

  // Next step handler
  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormValid()) {
      setFormStep(2);
    } else {
      // Show validation errors for all fields
      validateAllFields();
      toast.error("Por favor complete todos los campos correctamente");
    }
  };

  // Previous step handler
  const handlePrevStep = () => {
    setFormStep(1);
  };

  // Validate all fields at once
  const validateAllFields = () => {
    const newErrors = { ...errors };

    // Validate step 1 fields
    if (newUser.name.trim() === "") {
      newErrors.name = "El nombre de usuario es requerido";
    }

    if (newUser.company.trim() === "") {
      newErrors.company = "El nombre de la compañía es requerido";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (newUser.email.trim() === "") {
      newErrors.emailError = "El correo electrónico es requerido";
    } else if (!emailPattern.test(newUser.email)) {
      newErrors.emailError = "Formato de correo inválido";
    }

    handlePhoneValidation(newUser.telefono);

    // Validate step 2 fields
    if (newUser.password) {
      const lengthError = newUser.password.length < 8;
      const passwordError =
        newUser.password !== newUser.confirmPassword &&
        newUser.confirmPassword !== "";
      const complexityError = !validatePassword(newUser.password);

      newErrors.lengthError = lengthError;
      newErrors.passwordError = passwordError;
      newErrors.complexityError = complexityError;
    }

    setErrors(newErrors);
  };

  // Submit form handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      validateAllFields();
      toast.error("Por favor complete todos los campos correctamente");
      return;
    }

    try {
      setIsLoading(true);
      const result = await signUp(newUser);

      if (result) {
        setRegistrationSuccess(true);
        toast.success("Registro exitoso! Verifique su correo electrónico.");
      } else {
        toast.error("Hubo un problema al crear su cuenta. Inténtelo de nuevo.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      toast.error("Error al registrar usuario. Inténtelo más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  // Google sign up handler
  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      await signUpWithGoogle();
      // No need to redirect here, the useEffect will handle it
    } catch (error) {
      console.error("Error al registrarse con Google", error);
      toast.error("Error al registrarse con Google");
    } finally {
      setIsLoading(false);
    }
  };

  // Registration success screen
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
              <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-indigo-500/20">
                <Mail className="w-10 h-10 text-indigo-500" />
              </div>
              <h2 className="mb-4 text-xl font-semibold text-indigo-200">
                Verifica tu correo electrónico
              </h2>
              <p className="mb-6 text-indigo-200/65">
                Hemos enviado un correo de verificación a{" "}
                <strong className="text-indigo-400">{newUser.email}</strong>.
                Por favor, revisa tu bandeja de entrada y haz clic en el enlace
                de verificación para activar tu cuenta.
              </p>
              <p className="mb-10 text-sm text-indigo-200/65">
                Si no encuentras el correo, verifica tu carpeta de spam o
                solicita un nuevo correo de verificación.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setRegistrationSuccess(false)}
                  className="text-indigo-300 btn bg-indigo-500/20 hover:bg-indigo-500/30"
                >
                  Volver al registro
                </button>
                <Link
                  href="/signin"
                  className="btn bg-gradient-to-t from-indigo-600 to-indigo-500 text-white hover:bg-[length:100%_150%]"
                >
                  Ir a Iniciar Sesión
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Main registration form
  return (
    <section>
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="py-12 md:py-20">
          <div className="pb-8 text-center">
            <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Crea tu usuario
            </h1>
            <p className="mt-2 text-indigo-200/65">
              {formStep === 1
                ? "Información básica de la cuenta"
                : "Establece tu contraseña"}
            </p>
            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <div
                className={`w-3 h-3 rounded-full ${
                  formStep === 1 ? "bg-indigo-500" : "bg-indigo-200"
                }`}
              ></div>
              <div
                className={`w-3 h-3 rounded-full ${
                  formStep === 2 ? "bg-indigo-500" : "bg-indigo-200"
                }`}
              ></div>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto">
            {formStep === 1 ? (
              <form onSubmit={handleNextStep} className="space-y-5">
                <InputField
                  id="name"
                  label="Nombre"
                  value={newUser.name}
                  onChange={handleOnChange}
                  error={errors.name}
                  required
                  icon={<span className="text-indigo-300/50">@</span>}
                />

                <InputField
                  id="company"
                  label="Nombre de Compañía"
                  value={newUser.company}
                  onChange={handleOnChange}
                  error={errors.company}
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
                  icon={<Mail className="w-4 h-4 text-indigo-300/50" />}
                />

                <InputField
                  id="telefono"
                  label="Número Telefónico"
                  value={newUser.telefono}
                  onChange={handleOnChange}
                  error={
                    errors.phoneError
                      ? "Formato inválido. Ej: +54 9 11 1234-5678"
                      : ""
                  }
                  required
                  placeholder="+54 9 11 1234-5678"
                />

                <div className="flex justify-between gap-4 mt-8">
                  <button
                    type="button"
                    onClick={handleGoogleSignUp}
                    disabled={isLoading || contextLoading}
                    className="flex items-center justify-center w-full text-gray-300 transition-all duration-200 btn bg-gradient-to-b from-gray-800 to-gray-800/60 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading || contextLoading ? (
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

                  <button
                    type="submit"
                    className="w-full btn bg-gradient-to-t from-indigo-600 to-indigo-500 text-white hover:bg-[length:100%_150%]"
                    disabled={isLoading || contextLoading}
                  >
                    {isLoading || contextLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Continuar"
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-5">
                  <PasswordField
                    password={newUser.password}
                    showPassword={showPassword}
                    toggleShowPassword={() => setShowPassword(!showPassword)}
                    onChange={handlePasswordChange}
                    lengthError={errors.lengthError}
                    complexityError={errors.complexityError}
                  />

                  <ConfirmPasswordField
                    confirmPassword={newUser.confirmPassword}
                    showPassword={showConfirmPassword}
                    toggleShowPassword={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    onChange={handlePasswordChange}
                    passwordError={errors.passwordError}
                  />

                  {/* Password Requirements */}
                  <div className="p-4 mt-2 rounded-lg bg-indigo-900/30">
                    <h4 className="mb-2 text-sm font-medium text-indigo-200">
                      Requisitos de contraseña:
                    </h4>
                    <ul className="space-y-1 text-xs text-indigo-200/65">
                      <PasswordRequirement
                        met={newUser.password.length >= 8}
                        text="Mínimo 8 caracteres"
                      />
                      <PasswordRequirement
                        met={/[A-Z]/.test(newUser.password)}
                        text="Al menos una letra mayúscula"
                      />
                      <PasswordRequirement
                        met={/[a-z]/.test(newUser.password)}
                        text="Al menos una letra minúscula"
                      />
                      <PasswordRequirement
                        met={/\d/.test(newUser.password)}
                        text="Al menos un número"
                      />
                      <PasswordRequirement
                        met={/[!@#$%^&*(),.?":{}|<>]/.test(newUser.password)}
                        text="Al menos un caracter especial (!@#$%...)"
                      />
                      <li className="mt-1 text-indigo-300">
                        <small>Se requieren al menos 3 de 5 criterios</small>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-8">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="flex-1 text-indigo-300 btn bg-indigo-500/20 hover:bg-indigo-500/30"
                    disabled={isLoading || contextLoading}
                  >
                    Atrás
                  </button>

                  <button
                    type="submit"
                    className="flex-1 btn bg-gradient-to-t from-indigo-600 to-indigo-500 text-white hover:bg-[length:100%_150%]"
                    disabled={
                      isLoading ||
                      contextLoading ||
                      errors.passwordError ||
                      errors.lengthError ||
                      errors.complexityError
                    }
                  >
                    {isLoading || contextLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      "Completar Registro"
                    )}
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 text-sm text-center text-indigo-200/65">
              ¿Ya posee una cuenta?{" "}
              <Link className="font-medium text-indigo-500" href="/signin">
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Input Field Component
interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
}

const InputField = ({
  id,
  label,
  value,
  onChange,
  error,
  required,
  type = "text",
  placeholder,
  icon,
}: InputFieldProps) => (
  <div>
    <label
      htmlFor={id}
      className="block mb-1 text-sm font-medium text-indigo-200/65"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {icon}
        </div>
      )}
      <input
        id={id}
        name={id}
        type={type}
        className={`w-full form-input ${icon ? "pl-10" : ""} ${
          error ? "border-red-500 focus:ring-red-500" : "focus:ring-indigo-500"
        }`}
        placeholder={placeholder || `Ingrese su ${label}`}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
    {error && <ErrorText>{error}</ErrorText>}
  </div>
);

// Password Field Component
interface PasswordFieldProps {
  password: string;
  showPassword: boolean;
  toggleShowPassword: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  lengthError?: boolean;
  complexityError?: boolean;
}

const PasswordField = ({
  password,
  showPassword,
  toggleShowPassword,
  onChange,
  lengthError,
  complexityError,
}: PasswordFieldProps) => (
  <div>
    <label
      htmlFor="password"
      className="block mb-1 text-sm font-medium text-indigo-200/65"
    >
      Contraseña <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <input
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        className={`w-full pr-10 form-input ${
          lengthError || complexityError
            ? "border-red-500 focus:ring-red-500"
            : "focus:ring-indigo-500"
        }`}
        placeholder="Establezca una contraseña segura"
        value={password}
        onChange={onChange}
        required
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex items-center px-3 text-indigo-300"
        onClick={toggleShowPassword}
      >
        {showPassword ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>
    </div>
    {lengthError && (
      <ErrorText>La contraseña debe tener al menos 8 caracteres</ErrorText>
    )}
    {complexityError && !lengthError && (
      <ErrorText>
        La contraseña no cumple con los requisitos mínimos de seguridad
      </ErrorText>
    )}
  </div>
);

// Confirm Password Field Component
interface ConfirmPasswordFieldProps {
  confirmPassword: string;
  showPassword: boolean;
  toggleShowPassword: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  passwordError?: boolean;
}

const ConfirmPasswordField = ({
  confirmPassword,
  showPassword,
  toggleShowPassword,
  onChange,
  passwordError,
}: ConfirmPasswordFieldProps) => (
  <div>
    <label
      htmlFor="confirmPassword"
      className="block mb-1 text-sm font-medium text-indigo-200/65"
    >
      Confirmar contraseña <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      <input
        id="confirmPassword"
        name="confirmPassword"
        type={showPassword ? "text" : "password"}
        className={`w-full pr-10 form-input ${
          passwordError
            ? "border-red-500 focus:ring-red-500"
            : "focus:ring-indigo-500"
        }`}
        placeholder="Repita la contraseña"
        value={confirmPassword}
        onChange={onChange}
        required
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 flex items-center px-3 text-indigo-300"
        onClick={toggleShowPassword}
      >
        {showPassword ? (
          <EyeOff className="w-4 h-4" />
        ) : (
          <Eye className="w-4 h-4" />
        )}
      </button>
    </div>
    {passwordError && <ErrorText>Las contraseñas no coinciden</ErrorText>}
  </div>
);

// Password Requirement Component
interface PasswordRequirementProps {
  met: boolean;
  text: string;
}

const PasswordRequirement = ({ met, text }: PasswordRequirementProps) => (
  <li className="flex items-center gap-2">
    {met ? (
      <CheckCircle className="w-3 h-3 text-green-500" />
    ) : (
      <AlertCircle className="w-3 h-3 text-amber-500" />
    )}
    <span className={met ? "text-indigo-200" : "text-indigo-200/50"}>
      {text}
    </span>
  </li>
);

// Error Text Component
interface ErrorTextProps {
  children: React.ReactNode;
}

const ErrorText = ({ children }: ErrorTextProps) => (
  <span className="mt-1 text-xs text-red-500">{children}</span>
);
