"use client";
import React, { createContext, useEffect, useState, ReactNode } from "react";
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
  signOut: () => void;
  loginWithGoogle: () => Promise<IUser | null>;
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
  signOut: () => {
    throw new Error("Not implemented");
  },
  loginWithGoogle: async () => {
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

  useEffect(() => {
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
      setUserState(session.user as IUser);
      localStorage.setItem("user", JSON.stringify(session.user));
    }
  }, [session]);

  const signInO = async (signInData: SignInDTO): Promise<IUser | null> => {
    const { data, error } = await handleAsync(
      api.post("/users/singin", signInData)
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
  };

  const signUp = async (signUpData: SignUpDTO): Promise<IUser> => {
    const { data, error } = await handleAsync(
      api.post("/users/singUp", signUpData)
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
  };

  const deleteUser = async (signInData: SignInDTO): Promise<IUser> => {
    const { data, error } = await handleAsync(
      api.delete("/users/user", { data: signInData })
    );
    if (error || !data) {
      throw new Error(error.message || "Hubo un error al eliminar el usuario.");
    }
    const deletedUser = data.data;
    setToken("");
    setUserState(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return deletedUser;
  };

  const mailIsValid = async (email: string): Promise<boolean> => {
    try {
      const response = await api.get(`/users/email/${email}`);
      return response.data;
    } catch (error) {
      return false;
    }
  };

  const updateUser = async (
    updateUserData: Partial<updateUserDTO>
  ): Promise<IUser> => {
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
  };

  const signOut = async (): Promise<void> => {
    await nextAuthSignOut({ redirect: false });
    setToken("");
    setUserState(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  console.log(user);
  const loginWithGoogle = async (): Promise<IUser | null> => {
    try {
      await signIn("google"); // No se necesita el segundo argumento

      const session = await getSession(); // Obtiene la sesión después de iniciar sesión

      if (!session || !session.user) {
        throw new Error("No se pudo obtener la sesión del usuario.");
      }

      const returnedUser = session.user as IUser;
      setUserState(returnedUser);
      localStorage.setItem("user", JSON.stringify(returnedUser));

      return returnedUser;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const requestResetPassword = async (
    email: string
  ): Promise<{ message: string }> => {
    const { data, error } = await handleAsync(
      api.post("/users/request-reset-password", { email })
    );
    if (error || !data) {
      throw new Error(
        error.message || "Error al solicitar reset de contraseña"
      );
    }
    return data.data;
  };

  const resetPassword = async (
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
  };

  return (
    <UserContext.Provider
      value={{
        token,
        user,
        signInO,
        signUp,
        deleteUser,
        mailIsValid,
        updateUser,
        signOut,
        loginWithGoogle,
        requestResetPassword,
        resetPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
