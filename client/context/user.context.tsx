"use client";

import React, { createContext, useEffect, useState, ReactNode } from "react";
import { IUser } from "@/interfaces/User.interface";
import api from "@/app/api/Api";
import { SignInDTO, SignUpDTO } from "./DTO/sing.user.dto";
import { handleAsync } from "@/utils/error.helper";

interface UserContextProps {
  token: string;
  user: IUser | null;
  signIn: (data: SignInDTO) => Promise<IUser>;
  signUp: (data: SignUpDTO) => Promise<IUser>;
  deleteUser: (data: SignInDTO) => Promise<IUser>;
  mailIsValid: (email: string) => Promise<boolean>;
  setUser: (user: IUser | null) => void;
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
  setUser: () => {},
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

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUser) {
      try {
        setUserState(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error al parsear el usuario del localStorage", error);
      }
    }
  }, []);

  const signIn = async (signInData: SignInDTO): Promise<IUser> => {
    const { data, error } = await handleAsync(
      api.post("/users/signIn", signInData)
    );
    if (error || !data || !data.data) {
      throw new Error("No se recibió respuesta de la API");
    }

    const { User: returnedUser, token: returnedToken } = data.data;
    setToken(returnedToken);
    setUserState(returnedUser);
    localStorage.setItem("token", returnedToken);
    localStorage.setItem("user", JSON.stringify(returnedUser));
    return returnedUser;
  };

  const signUp = async (signUpData: SignUpDTO): Promise<IUser> => {
    const { data, error } = await handleAsync(
      api.post("/users/signUp", signUpData)
    );
    if (error || !data || !data.data) {
      throw new Error("No se recibió respuesta de la API");
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
    if (error || !data || !data.data) {
      throw new Error("No se recibió respuesta de la API");
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
      const response = await api.get(`/email/${email}`);

      if (
        response.data ||
        response.data === null ||
        response.data === undefined
      ) {
        return false;
      }

      return response.data;
    } catch (error) {
      return false;
    }
  };

  const value = {
    token,
    user,
    setUser: setUserState,
    signIn,
    signUp,
    deleteUser,
    mailIsValid,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
