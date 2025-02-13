"use client";
import React, { createContext, useState, ReactNode } from "react";
import api from "@/app/api/Api";
import { handleAsync } from "@/utils/error.helper";

interface AdminContextProps {
  getUsers: () => Promise<any[]>;
  getUsersSubscribed: () => Promise<any[]>;
  getUsersSubscribedAt: (planId: number) => Promise<any[]>;
}

const defaultContext: AdminContextProps = {
  getUsers: async () => {
    throw new Error("Not implemented");
  },
  getUsersSubscribed: async () => {
    throw new Error("Not implemented");
  },
  getUsersSubscribedAt: async (_planId: number) => {
    throw new Error("Not implemented");
  },
};

export const AdminContext = createContext<AdminContextProps>(defaultContext);

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider = ({ children }: AdminProviderProps) => {
  const getUsers = async (): Promise<any[]> => {
    const cachedUsers = localStorage.getItem("admin_users");
    if (cachedUsers) {
      console.log("Cargando usuarios desde localStorage...");
      return JSON.parse(cachedUsers);
    }

    const { data, error } = await handleAsync(api.get("/users/users"));
    if (error || !data) {
      throw new Error(error.message || "Hubo un error al iniciar sesión.");
    }
    localStorage.setItem("admin_users", JSON.stringify(data.data));
    return data.data;
  };

  const getUsersSubscribed = async (): Promise<any[]> => {
    const cachedUsersSubscribed = localStorage.getItem("admin_usersSubscribed");
    if (cachedUsersSubscribed) {
      console.log("Cargando usuarios suscritos desde localStorage...");
      return JSON.parse(cachedUsersSubscribed);
    }

    const { data, error } = await handleAsync(
      api.get("/users/getUsersSubscribed")
    );
    if (error || !data) {
      throw new Error(error.message || "Hubo un error al iniciar sesión.");
    }
    localStorage.setItem("admin_usersSubscribed", JSON.stringify(data.data));
    return data.data;
  };

  const getUsersSubscribedAt = async (planId: number): Promise<any[]> => {
    const cacheKey = `admin_usersSubscribed_plan_${planId}`;
    const cachedUsersSubscribedAt = localStorage.getItem(cacheKey);
    if (cachedUsersSubscribedAt) {
      console.log(
        `Cargando usuarios suscritos al plan ${planId} desde localStorage...`
      );
      return JSON.parse(cachedUsersSubscribedAt);
    }

    const { data, error } = await handleAsync(
      api.get(`/users/getUsersSubscribed/${planId}`)
    );
    if (error || !data) {
      throw new Error(error.message || "Hubo un error al iniciar sesión.");
    }
    localStorage.setItem(cacheKey, JSON.stringify(data.data));
    return data.data;
  };

  const value: AdminContextProps = {
    getUsers,
    getUsersSubscribed,
    getUsersSubscribedAt,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
