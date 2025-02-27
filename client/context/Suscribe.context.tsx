"use client";
import React, {
  useState,
  createContext,
  useEffect,
  useMemo,
  useContext,
} from "react";
import api from "@/app/api/Api";
import { handleAsync } from "@/utils/error.helper";
import { ISubscripcion } from "@/interfaces/Subscripcion.interface";
import UserContext from "@/context/user.context";

interface SubscriptionContextProps {
  sub: ISubscripcion | null;
  suscribirse: (
    planId: number,
    paymentMethodToken: string,
    email: string
  ) => Promise<void>;
  desuscribirse: () => Promise<void>;
  fetchSub: () => Promise<ISubscripcion | null>;
}

const defaultSubscriptionContext: SubscriptionContextProps = {
  sub: null,
  suscribirse: async () => {},
  desuscribirse: async () => {},
  fetchSub: async () => null,
};

export const SubscriptionContext = createContext<SubscriptionContextProps>(
  defaultSubscriptionContext
);

export const SubscriptionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useContext(UserContext);
  const [sub, setSub] = useState<ISubscripcion | null>(null);

  const suscribirse = async (
    planId: number,
    paymentMethodToken: string,
    email: string
  ) => {
    try {
      const { data, error } = await handleAsync(
        api.post(`/subscriptions`, {
          planId,
          userEmail: email,
          paymentMethodToken,
        })
      );
      if (error || !data?.data?.subscription) {
        console.error(
          "Error al suscribirse:",
          error || "No se retornaron datos"
        );
        return;
      }
      const newSubscription: ISubscripcion = data.data.subscription;
      setSub(newSubscription);
      localStorage.setItem("subscripcion", JSON.stringify(newSubscription));
    } catch (err) {
      console.error("Excepción en suscribirse:", err);
    }
  };

  const desuscribirse = async () => {
    if (!sub) return;
    try {
      const { data, error } = await handleAsync(
        api.post(`/subscriptions/cancel`, {
          subscriptionId: sub.mercadopagoSubscriptionId,
          cancellationReason: "Cancelación solicitada por el usuario",
        })
      );
      if (error || !data?.data?.subscription) {
        console.error(
          "Error al desuscribirse:",
          error || "No se retornaron datos"
        );
        return;
      }
      setSub(null);
      localStorage.removeItem("subscripcion");
    } catch (err) {
      console.error("Excepción en desuscribirse:", err);
    }
  };

  const fetchSub = async (): Promise<ISubscripcion | null> => {
    if (!user) return null;
    if (!user.subscripcion) setSub(user.subscripcion);

    const { data, error } = await handleAsync(api.get(`/users/sub/${user.id}`));
    if (error || !data?.data) {
      console.log(
        "Error al obtener la Subscripcion, error:",
        error || "No se retornaron datos"
      );
      return null;
    }

    setSub(data?.data);
    return data.data;
  };

  useEffect(() => {
    fetchSub();
  }, [user]);

  const value = useMemo(
    () => ({
      sub,
      suscribirse,
      desuscribirse,
      fetchSub,
    }),
    [sub, user]
  );

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
