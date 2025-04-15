"use client";
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";
import { IUser } from "@/interfaces/User.interface";
import api from "@/utils/Api";
import { SignInDTO, SignUpDTO, updateUserDTO } from "./DTO/sing.user.dto";
import { handleAsync } from "@/utils/error.helper";
import {
  signIn,
  signOut as nextAuthSignOut,
  useSession,
} from "next-auth/react";
import { IUserContextProps } from "./DTO/IUserContextProps.interface";
import Cookies from "js-cookie";

const defaultContext: IUserContextProps = {
  token: "",
  user: null,
  signInO: async () => {
    throw new Error("Not implemented");
  },
  signUp: async () => {
    throw new Error("Not implemented");
  },
  deleteUser: async () => {
    throw new Error("Not implemented");
  },
  mailIsValid: async () => {
    throw new Error("Not implemented");
  },
  updateUser: async () => {
    throw new Error("Not implemented");
  },
  signOut: async () => {
    throw new Error("Not implemented");
  },
  signInWithGoogle: async () => {
    throw new Error("Not implemented");
  },
  signUpWithGoogle: async () => {
    throw new Error("Not implemented");
  },
  requestResetPassword: async () => {
    throw new Error("Not implemented");
  },
  resetPassword: async () => {
    throw new Error("Not implemented");
  },
  verifyEmail: async () => {
    throw new Error("Not implemented");
  },
  initiatePasswordReset: async () => {
    throw new Error("Not implemented");
  },
  isLoading: false,
};

export const UserContext = createContext<IUserContextProps>(defaultContext);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: session } = useSession();
  const [user, setUserState] = useState<IUser | null>(null);
  const [token, setToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Efecto para manejar la sesión de Google
  useEffect(() => {
    const handleGoogleSession = async () => {
      if (session && session.user && !user) {
        try {
          setIsLoading(true);
          const { email, name } = session.user as {
            email: string;
            name: string;
          };
          if (email && name) {
            await registerUser(email, name);
          }
        } catch (error) {
          console.error("Error al procesar la sesión de Google:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    handleGoogleSession();
  }, [session, user]);

  // Cargar datos del usuario desde localStorage/cookies al montar el componente
  useEffect(() => {
    const storedToken = localStorage.getItem("token") || Cookies.get("token");
    const storedUser = localStorage.getItem("user") || Cookies.get("user");

    if (storedToken) setToken(storedToken);
    if (storedUser) {
      try {
        setUserState(JSON.parse(storedUser));
      } catch (error) {
        console.error(
          "Error al parsear el usuario del localStorage o cookie",
          error
        );
      }
    }
  }, []);

  // Guardar datos del usuario tanto en localStorage como en cookies
  const saveUserData = useCallback((user: IUser, token: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    Cookies.set("token", token, { expires: 7 });
    Cookies.set("user", JSON.stringify(user), { expires: 7 });
  }, []);

  // Limpiar datos del usuario desde localStorage y cookies
  const clearUserData = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    Cookies.remove("token");
    Cookies.remove("user");

    // Limpiar datos de suscripciones
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("subscripcion_")) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  const registerUser = useCallback(
    async (email: string, name: string): Promise<IUser> => {
      try {
        setIsLoading(true);
        // Comprobar si existe el usuario por email
        const { data: existsResponse, error: getError } = await handleAsync(
          api.get(`users/email/get/${email}`)
        );

        if (getError) {
          throw new Error(getError.message);
        }

        // Si el usuario existe, se obtienen sus datos
        if (existsResponse?.data) {
          const { data: fetchedResponse, error: fetchError } =
            await handleAsync(api.get(`/users/get/${email}`));

          if (fetchError || !fetchedResponse) {
            throw new Error(
              fetchError?.message || "Error al obtener usuario existente"
            );
          }

          setUserState(fetchedResponse.data.User);
          setToken(fetchedResponse.data.token);
          saveUserData(fetchedResponse.data.User, fetchedResponse.data.token);
          return fetchedResponse.data.User;
        }

        // Si el usuario no existe, crear una nueva cuenta
        const { data: createdResponse, error: postError } = await handleAsync(
          api.post("/users/crearUser/google", { email, name })
        );

        if (postError || !createdResponse) {
          throw new Error(postError?.message || "Error al crear usuario");
        }

        setUserState(createdResponse.data);
        setToken(createdResponse.data.token);
        saveUserData(createdResponse.data, createdResponse.data.token);
        return createdResponse.data;
      } catch (error: any) {
        console.error("Error en el proceso de registro:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [saveUserData]
  );

  // signInO puede devolver null en caso de fallo (según interface)
  const signInO = useCallback(
    async (signInData: SignInDTO): Promise<IUser | null> => {
      try {
        setIsLoading(true);
        const { data: response, error } = await handleAsync(
          api.post("/users/signIn", signInData)
        );

        if (error || !response?.data) {
          throw new Error(error?.message || "Error de inicio de sesión");
        }

        const { User: returnedUser, token: returnedToken } = response.data;
        setToken(returnedToken);
        setUserState(returnedUser);
        saveUserData(returnedUser, returnedToken);
        return returnedUser;
      } catch (error: any) {
        console.error("Error en signIn:", error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [saveUserData]
  );

  // La función signUp debe retornar un IUser (no null)
  const signUp = useCallback(
    async (signUpData: SignUpDTO): Promise<IUser> => {
      try {
        setIsLoading(true);
        const { data: response, error } = await handleAsync(
          api.post("/users/signUp", signUpData)
        );

        if (error || !response?.data) {
          throw new Error(error?.message || "Error de registro");
        }

        const { user: returnedUser, token: returnedToken } = response.data;
        setToken(returnedToken);
        setUserState(returnedUser);
        saveUserData(returnedUser, returnedToken);
        return returnedUser;
      } catch (error: any) {
        console.error("Error en signUp:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [saveUserData]
  );

  // deleteUser debe retornar un IUser
  const deleteUser = useCallback(
    async (signInData: SignInDTO): Promise<IUser> => {
      try {
        setIsLoading(true);
        const { data: response, error } = await handleAsync(
          api.delete("/users/user", { data: signInData })
        );

        if (error || !response?.data) {
          throw new Error(error?.message || "Error al eliminar usuario");
        }

        const deletedUser = response.data;
        setToken("");
        setUserState(null);
        clearUserData();
        return deletedUser;
      } catch (error: any) {
        console.error("Error al eliminar usuario:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [clearUserData]
  );

  const mailIsValid = useCallback(async (email: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await api.get(`/users/email/${email}`);
      return response.data;
    } catch (error) {
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // updateUser debe retornar un IUser
  const updateUser = useCallback(
    async (updateUserData: updateUserDTO): Promise<IUser> => {
      if (!user?.id) throw new Error("Usuario no autenticado");

      try {
        setIsLoading(true);
        const { data: response, error } = await handleAsync(
          api.put(`/users/update/${user.id}`, { ...updateUserData })
        );

        if (error || !response?.data) {
          throw new Error(error?.message || "Error al actualizar usuario");
        }

        const { user: returnedUser, token: returnedToken } = response.data;

        if (returnedUser) {
          setUserState(returnedUser);
          saveUserData(returnedUser, returnedToken || token);
        }

        return returnedUser;
      } catch (error: any) {
        console.error("Error al actualizar usuario:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [user, saveUserData, token]
  );

  const signOut = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      await nextAuthSignOut({ redirect: false });
      setToken("");
      setUserState(null);
      clearUserData();
    } catch (error) {
      console.error("Error durante el cierre de sesión:", error);
    } finally {
      setIsLoading(false);
    }
  }, [clearUserData]);

  const signInWithGoogle = useCallback(async (): Promise<IUser | null> => {
    try {
      setIsLoading(true);
      await signIn("google", { callbackUrl: "/" });
      return null;
    } catch (error: any) {
      console.error("Error en signInWithGoogle:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // signUpWithGoogle simplemente delega a signInWithGoogle
  const signUpWithGoogle = useCallback(async (): Promise<IUser | null> => {
    return signInWithGoogle();
  }, [signInWithGoogle]);

  // verifyEmail debe retornar un objeto con { message, user }
  const verifyEmail = useCallback(
    async (token: string): Promise<{ message: string; user: IUser }> => {
      try {
        setIsLoading(true);
        const { data: response, error } = await handleAsync(
          api.post("/users/verify-email", { token })
        );

        if (error || !response?.data) {
          throw new Error(error?.message || "Error al verificar email");
        }

        if (user && user.id === response.data.user.id) {
          const updatedUser = { ...response.data.user };
          setUserState(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
          Cookies.set("user", JSON.stringify(updatedUser), { expires: 7 });
        }

        return response.data;
      } catch (error: any) {
        console.error("Error al verificar email:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [user]
  );

  // initiatePasswordReset debe retornar { message }
  const initiatePasswordReset = useCallback(
    async (email: string): Promise<{ message: string }> => {
      try {
        setIsLoading(true);
        const { data: response, error } = await handleAsync(
          api.get(`/users/initiate-password-reset/${email}`)
        );

        if (error || !response?.data) {
          throw new Error(
            error?.message ||
              "Error al solicitar restablecimiento de contraseña"
          );
        }

        return response.data;
      } catch (error: any) {
        console.error(
          "Error al iniciar restablecimiento de contraseña:",
          error
        );
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // resetPassword debe retornar { message, user }
  const resetPassword = useCallback(
    async (
      tokenParam: string,
      newPassword: string
    ): Promise<{ message: string; user: IUser }> => {
      try {
        setIsLoading(true);
        const { data: response, error } = await handleAsync(
          api.post("/users/reset-password", { token: tokenParam, newPassword })
        );

        if (error || !response?.data) {
          throw new Error(error?.message || "Error al restablecer contraseña");
        }

        return response.data;
      } catch (error: any) {
        console.error("Error al restablecer contraseña:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const value = useMemo(
    () => ({
      token,
      user,
      signInO,
      signUp,
      deleteUser,
      mailIsValid,
      updateUser,
      signOut,
      signInWithGoogle,
      signUpWithGoogle,
      verifyEmail,
      initiatePasswordReset,
      resetPassword,
      requestResetPassword: initiatePasswordReset,
      isLoading,
    }),
    [
      token,
      user,
      signInO,
      signUp,
      deleteUser,
      mailIsValid,
      updateUser,
      signOut,
      signInWithGoogle,
      signUpWithGoogle,
      verifyEmail,
      initiatePasswordReset,
      resetPassword,
      isLoading,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
