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
import api from "@/app/api/Api";
import { SignInDTO, SignUpDTO, updateUserDTO } from "./DTO/sing.user.dto";
import { handleAsync } from "@/utils/error.helper";
import {
  signIn,
  signOut as nextAuthSignOut,
  useSession,
  getSession,
} from "next-auth/react";

interface UserContextProps {
  token: string;
  user: IUser | null;
  signInO: (data: SignInDTO) => Promise<IUser | null>;
  signUp: (data: SignUpDTO) => Promise<IUser>;
  deleteUser: (data: SignInDTO) => Promise<IUser>;
  mailIsValid: (email: string) => Promise<boolean>;
  updateUser: (updateUserData: updateUserDTO) => Promise<IUser>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<IUser | null>;
  signUpWithGoogle: () => Promise<IUser | null>;
  requestResetPassword: (email: string) => Promise<{ message: string }>;
  resetPassword: (
    token: string,
    newPassword: string
  ) => Promise<{ message: string }>;
}

const defaultContext: UserContextProps = {
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

export const UserContext = createContext<UserContextProps>(defaultContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const { data: session } = useSession();
  const [user, setUserState] = useState<IUser | null>(null);
  const [token, setToken] = useState<string>("");
  const [isSignedOut, setIsSignedOut] = useState<boolean>(false);

  useEffect(() => {
    if (isSignedOut) return;
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken) setToken(storedToken);
    if (storedUser) {
      try {
        setUserState(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error al parsear el usuario del localStorage", error);
      }
    }
    if (session?.user) {
      const { email, name } = session.user as IUser;
      registerUser(email, name);
    }
  }, [session, isSignedOut]);

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
            console.log("Error al traer el usuario:", fetchError?.message);
            return null;
          }
          setUserState(fetchedResponse.data.User);
          setToken(fetchedResponse.data.token);
          localStorage.setItem("token", fetchedResponse.data.token);
          localStorage.setItem("user", JSON.stringify(fetchedResponse.data));
          return fetchedResponse.data;
        }
        const { data: createdResponse, error: postError } = await handleAsync(
          api.post("/users/crearUser/google", { email, name })
        );
        if (postError || !createdResponse) {
          console.log("Error al crear el usuario:", postError?.message);
          return null;
        }
        setUserState(createdResponse.data);
        localStorage.setItem("user", JSON.stringify(createdResponse.data));
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
      const { data, error } = await handleAsync(
        api.post("/users/signIn", signInData)
      );
      if (error || !data) {
        throw new Error(error.message || "Hubo un error al iniciar sesión.");
      }
      const { User: returnedUser, token: returnedToken } = data?.data || {};
      if (!returnedUser || !returnedToken) {
        throw new Error("Los datos de autenticación son inválidos.");
      }
      setToken(returnedToken);
      setUserState(returnedUser);
      localStorage.setItem("token", returnedToken);
      localStorage.setItem("user", JSON.stringify(returnedUser));
      return returnedUser;
    },
    []
  );

  const signUp = useCallback(async (signUpData: SignUpDTO): Promise<IUser> => {
    const { data, error } = await handleAsync(
      api.post("/users/signUp", signUpData)
    );
    if (error || !data) {
      throw new Error(error.message || "Hubo un error al registrarse.");
    }
    const { User: returnedUser, token: returnedToken } = data.data;
    setToken(returnedToken);
    setUserState(returnedUser);
    localStorage.setItem("token", returnedToken);
    localStorage.setItem("user", JSON.stringify(returnedUser));
    return returnedUser;
  }, []);

  const deleteUser = useCallback(
    async (signInData: SignInDTO): Promise<IUser> => {
      const { data, error } = await handleAsync(
        api.delete("/users/user", { data: signInData })
      );
      if (error || !data) {
        throw new Error(
          error.message || "Hubo un error al eliminar el usuario."
        );
      }
      const deletedUser = data.data;
      setToken("");
      setUserState(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return deletedUser;
    },
    []
  );

  const mailIsValid = useCallback(async (email: string): Promise<boolean> => {
    try {
      const response = await api.get(`/users/email/${email}`);
      return response.data;
    } catch (error) {
      return false;
    }
  }, []);

  const updateUser = useCallback(
    async (updateUserData: Partial<updateUserDTO>): Promise<IUser> => {
      if (!user?.id) throw new Error("El usuario no está autenticado.");
      const { data, error } = await handleAsync(
        api.post("/users/update", { ...updateUserData, id: user.id })
      );
      if (error || !data) {
        throw new Error(
          error.message || "Hubo un error al actualizar el usuario."
        );
      }
      const { User: returnedUser, token: returnedToken } = data.data;
      setToken(returnedToken);
      setUserState(returnedUser);
      localStorage.setItem("token", returnedToken);
      localStorage.setItem("user", JSON.stringify(returnedUser));
      return returnedUser;
    },
    [user]
  );

  const signOut = useCallback(async (): Promise<void> => {
    await nextAuthSignOut({ redirect: false });
    setToken("");
    setUserState(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsSignedOut(true);
  }, []);

  const signInWithGoogle = useCallback(async (): Promise<IUser | null> => {
    try {
      await signIn("google", { callbackUrl: "/" });
      const session = await getSession();
      if (!session || !session.user) {
        throw new Error("No se pudo obtener la sesión del usuario.");
      }
      const { email, name } = session.user as IUser;
      return registerUser(email, name);
    } catch (error) {
      console.error("Error en signInWithGoogle:", error);
      return null;
    }
  }, [registerUser]);

  const signUpWithGoogle = useCallback(async (): Promise<IUser | null> => {
    try {
      await signIn("google", { callbackUrl: "/" });
      const session = await getSession();
      if (!session || !session.user) {
        throw new Error("No se pudo obtener la sesión del usuario.");
      }
      const { email, name } = session.user as IUser;
      return registerUser(email, name);
    } catch (error) {
      console.error("Error en signUpWithGoogle:", error);
      return null;
    }
  }, [registerUser]);

  const requestResetPassword = useCallback(
    async (email: string): Promise<{ message: string }> => {
      const { data, error } = await handleAsync(
        api.post("/users/request-reset-password", { email })
      );
      if (error || !data) {
        throw new Error(
          error.message || "Error al solicitar reset de contraseña"
        );
      }
      return data.data;
    },
    []
  );

  const resetPassword = useCallback(
    async (
      token: string,
      newPassword: string
    ): Promise<{ message: string }> => {
      const { data, error } = await handleAsync(
        api.post("/users/reset-password", { token, newPassword })
      );
      if (error || !data) {
        throw new Error(error.message || "Error al resetear la contraseña");
      }
      return data.data;
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
    ]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
