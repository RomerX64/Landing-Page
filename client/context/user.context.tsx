"use client";
import React, { createContext, useEffect, useState, ReactNode } from "react";
import { IUser } from "@/interfaces/User.interface";
import api from "@/app/api/Api";
import { SignInDTO, SignUpDTO, updateUserDTO } from "./DTO/sing.user.dto";
import { handleAsync } from "@/utils/error.helper";

interface UserContextProps {
  token: string;
  user: IUser | null;
  signIn: (data: SignInDTO) => Promise<IUser | null>;
  signUp: (data: SignUpDTO) => Promise<IUser>;
  deleteUser: (data: SignInDTO) => Promise<IUser>;
  mailIsValid: (email: string) => Promise<boolean>;
  updateUser: (updateUserData: updateUserDTO) => Promise<IUser>;
  signOut: () => void;
  loginWithGoogle: (googleToken: string) => Promise<IUser>;
  requestResetPassword: (email: string) => Promise<{ message: string }>;
  resetPassword: (
    token: string,
    newPassword: string
  ) => Promise<{ message: string }>;
}

const defaultContext: UserContextProps = {
  token: "",
  user: null,
  signIn: async () => {
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
  }, []);

  const signIn = async (signInData: SignInDTO): Promise<IUser | null> => {
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
      // Se asume que el endpoint devuelve true/false.
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

  const signOut = (): void => {
    setToken("");
    setUserState(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const loginWithGoogle = async (googleToken: string): Promise<IUser> => {
    const { data, error } = await handleAsync(
      api.post("/users/login/google", { googleToken })
    );
    if (error || !data) {
      throw new Error(error.message || "Error al iniciar sesión con Google");
    }
    const { user: returnedUser, token: returnedToken } = data.data;
    setToken(returnedToken);
    setUserState(returnedUser);
    localStorage.setItem("token", returnedToken);
    localStorage.setItem("user", JSON.stringify(returnedUser));
    return returnedUser;
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

  const value = {
    token,
    user,
    setUser: setUserState,
    signIn,
    signUp,
    deleteUser,
    mailIsValid,
    updateUser,
    signOut,
    loginWithGoogle,
    requestResetPassword,
    resetPassword,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
