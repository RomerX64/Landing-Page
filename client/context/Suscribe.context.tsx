"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";
import api from "@/app/api/Api";
import { handleAsync } from "@/utils/error.helper";
import { UserContext } from "./user.context";

interface SuscribeContextProps {
  sub: any;
  suscribirse: (planId: number) => void;
  desuscribe: () => void;
}

const defaultContext: SuscribeContextProps = {
  sub: {},
  suscribirse: () => {},
  desuscribe: () => {},
};

export const SuscribeContext =
  createContext<SuscribeContextProps>(defaultContext);

interface SuscribeProviderProps {
  children: ReactNode;
}

export const SuscribeProvider = ({ children }: SuscribeProviderProps) => {
  const { user } = useContext(UserContext);
  const [sub, setSub] = useState({});

  const suscribirse = async (planId: number) => {
    const { data, error } = await handleAsync(
      api.get(`users/suscribe/${user?.id}/${planId}`)
    );

    if (error || !data || !data.data) {
      console.error("Error suscribing:", error || "No data returned");
      return;
    }

    setSub(data.data);
    console.log("Subscription successful:", data.data);
  };

  const desuscribe = async () => {
    const { data, error } = await handleAsync(
      api.get(`/users/desuscribe/${user?.id}`)
    );

    if (error || !data || !data.data) {
      console.error("Error unsubscribing:", error || "No data returned");
      return;
    }

    setSub({});
    console.log("Unsubscription successful:", data.data);
  };

  const value: SuscribeContextProps = {
    sub,
    suscribirse,
    desuscribe,
  };

  return (
    <SuscribeContext.Provider value={value}>
      {children}
    </SuscribeContext.Provider>
  );
};
