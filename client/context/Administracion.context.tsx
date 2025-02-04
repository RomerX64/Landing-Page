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
    const { data, error } = await handleAsync(api.get("/users/users"));
    if (error || !data || !data.data) throw new Error("Error fetching users");
    return data.data;
  };

  const getUsersSubscribed = async (): Promise<any[]> => {
    const { data, error } = await handleAsync(
      api.get("/users/getUsersSubscribed")
    );
    if (error || !data || !data.data)
      throw new Error("Error fetching subscribed users");
    return data.data;
  };

  const getUsersSubscribedAt = async (planId: number): Promise<any[]> => {
    const { data, error } = await handleAsync(
      api.get(`/users/getUsersSubscribed/${planId}`)
    );
    if (error || !data || !data.data)
      throw new Error("Error fetching subscribed users at plan");
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
