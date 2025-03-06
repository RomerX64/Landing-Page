"use client";
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { IUser } from "@/interfaces/User.interface";
import api from "@/utils/Api";
import { SignInDTO, SignUpDTO, updateUserDTO } from "./DTO/sing.user.dto";
import { handleAsync } from "@/utils/error.helper";
import {
  signIn,
  signOut as nextAuthSignOut,
  useSession,
  getSession,
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
};

export const UserContext = createContext<IUserContextProps>(defaultContext);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { data: session } = useSession();
  const [user, setUserState] = useState<IUser | null>(null);
  const [token, setToken] = useState<string>("");

  // Effect para manejar la sesión de Google
  useEffect(() => {
    const handleGoogleSession = async () => {
      if (session && session.user && !user) {
        try {
          const { email, name } = session.user as any;
          if (email && name) {
            await registerUser(email, name);
          }
        } catch (error) {
          console.error("Error al procesar la sesión de Google:", error);
        }
      }
    };

    handleGoogleSession();
  }, [session]);

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

  const registerUser = useCallback(
    async (email: string, name: string): Promise<IUser | null> => {
      try {
        const { data: existsResponse, error: getError } = await handleAsync(
          api.get(`users/email/get/${email}`)
        );
        if (getError) {
          console.warn(
            "Error al consultar existencia del usuario:",
            getError.message
          );
          return null;
        }

        if (existsResponse?.data) {
          const { data: fetchedResponse, error: fetchError } =
            await handleAsync(api.get(`/users/get/${email}`));
          if (fetchError || !fetchedResponse) {
            return null;
          }
          setUserState(fetchedResponse.data.User);
          setToken(fetchedResponse.data.token);
          localStorage.setItem("token", fetchedResponse.data.token);
          localStorage.setItem(
            "user",
            JSON.stringify(fetchedResponse.data.User)
          );
          Cookies.set("token", fetchedResponse.data.token, { expires: 7 }); // Guarda en cookies
          Cookies.set("user", JSON.stringify(fetchedResponse.data.User), {
            expires: 7,
          });
          return fetchedResponse.data.User;
        }

        const { data: createdResponse, error: postError } = await handleAsync(
          api.post("/users/crearUser/google", { email, name })
        );
        if (postError || !createdResponse) {
          return null;
        }
        setUserState(createdResponse.data);
        localStorage.setItem("user", JSON.stringify(createdResponse.data));
        Cookies.set("user", JSON.stringify(createdResponse.data), {
          expires: 7,
        });
        return createdResponse.data;
      } catch (error) {
        console.error("Error en el proceso de registro:", error);
        return null;
      }
    },
    []
  );

  const signInO = useCallback(
    async (signInData: SignInDTO): Promise<IUser | null> => {
      try {
        const { data: response, error } = await handleAsync(
          api.post("/users/signIn", signInData)
        );
        if (error || !response?.data) {
          throw new Error(error?.message || "Error de inicio de sesión");
        }
        const { User: returnedUser, token: returnedToken } = response.data;
        setToken(returnedToken);
        setUserState(returnedUser);
        localStorage.setItem("token", returnedToken);
        localStorage.setItem("user", JSON.stringify(returnedUser));
        Cookies.set("token", returnedToken, { expires: 7 });
        Cookies.set("user", JSON.stringify(returnedUser), { expires: 7 });
        return returnedUser;
      } catch (error) {
        console.error("Error en signIn:", error);
        return null;
      }
    },
    []
  );

  const signUp = useCallback(async (signUpData: SignUpDTO): Promise<IUser> => {
    const { data: response, error } = await handleAsync(
      api.post("/users/signUp", signUpData)
    );
    if (error || !response?.data) {
      throw new Error(error?.message || "Error de registro");
    }
    const { User: returnedUser, token: returnedToken } = response.data;
    setToken(returnedToken);
    setUserState(returnedUser);
    localStorage.setItem("token", returnedToken);
    localStorage.setItem("user", JSON.stringify(returnedUser));
    Cookies.set("token", returnedToken, { expires: 7 });
    Cookies.set("user", JSON.stringify(returnedUser), { expires: 7 });
    return returnedUser;
  }, []);

  const deleteUser = useCallback(
    async (signInData: SignInDTO): Promise<IUser> => {
      const { data: response, error } = await handleAsync(
        api.delete("/users/user", { data: signInData })
      );
      if (error || !response?.data) {
        throw new Error(error?.message || "Error al eliminar usuario");
      }
      const deletedUser = response.data;
      setToken("");
      setUserState(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      Cookies.remove("token"); // Elimina las cookies
      Cookies.remove("user");
      return deletedUser;
    },
    []
  );

  const mailIsValid = useCallback(async (email: string): Promise<boolean> => {
    try {
      const response = await api.get(`/users/email/${email}`);
      return response.data;
    } catch {
      return false;
    }
  }, []);

  const updateUser = useCallback(
    async (updateUserData: updateUserDTO): Promise<IUser> => {
      if (!user?.id) throw new Error("Usuario no autenticado");
      const { data: response, error } = await handleAsync(
        api.put(`/users/update/${user.id}`, { ...updateUserData })
      );
      if (error || !response?.data) {
        throw new Error(error?.message || "Error al actualizar usuario");
      }
      const { User: returnedUser, token: returnedToken } = response.data;
      return returnedUser;
    },
    [user]
  );

  const signOut = useCallback(async (): Promise<void> => {
    try {
      await nextAuthSignOut({ redirect: false });
      setToken("");
      setUserState(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("subscripcion");
      Cookies.remove("token"); // Elimina las cookies
      Cookies.remove("user");
    } catch (error) {
      console.error("Error durante el cierre de sesión:", error);
    }
  }, []);

  const signInWithGoogle = useCallback(async (): Promise<IUser | null> => {
    try {
      // Solo inicia el flujo de Google y no intenta obtener la sesión inmediatamente
      await signIn("google", { callbackUrl: "/" });
      // La sesión se manejará a través del useEffect cuando esté disponible
      return null;
    } catch (error) {
      console.error("Error en signInWithGoogle:", error);
      return null;
    }
  }, []);

  const signUpWithGoogle = useCallback(async (): Promise<IUser | null> => {
    return signInWithGoogle();
  }, [signInWithGoogle]);

  const requestResetPassword = useCallback(
    async (email: string): Promise<{ message: string }> => {
      const { data: response, error } = await handleAsync(
        api.post("/users/request-reset-password", { email })
      );
      if (error || !response?.data) {
        throw new Error(
          error?.message || "Error al solicitar reset de contraseña"
        );
      }
      return response.data;
    },
    []
  );

  const resetPassword = useCallback(
    async (
      token: string,
      newPassword: string
    ): Promise<{ message: string }> => {
      const { data: response, error } = await handleAsync(
        api.post("/users/reset-password", { token, newPassword })
      );
      if (error || !response?.data) {
        throw new Error(error?.message || "Error al resetear contraseña");
      }
      return response.data;
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
      requestResetPassword,
      resetPassword,
    }),
    [
      user,
      token,
      signInO,
      signUp,
      deleteUser,
      mailIsValid,
      updateUser,
      signOut,
      signInWithGoogle,
      signUpWithGoogle,
      requestResetPassword,
      resetPassword,
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
