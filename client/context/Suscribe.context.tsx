"use client";
import React, {
  useState,
  createContext,
  useEffect,
  useMemo,
  useContext,
} from "react";
import api from "@/utils/Api";
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
  desuscribirse: (cancellationReason?: string) => Promise<boolean>;
  fetchSub: () => Promise<ISubscripcion | null>;
}

const defaultSubscriptionContext: SubscriptionContextProps = {
  sub: null,
  suscribirse: async () => {},
  desuscribirse: async () => false,
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
  const { user, signOut } = useContext(UserContext);
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

  const desuscribirse = async (
    cancellationReason?: string
  ): Promise<boolean> => {
    try {
      if (!sub || !sub.id) {
        console.error("No hay suscripción activa para cancelar");
        return false;
      }

      const { data, error } = await handleAsync(
        api.post(`/subscriptions/cancel`, {
          subscriptionId: sub.id,
          cancellationReason: cancellationReason || "Cancelado por el usuario",
        })
      );

      if (error || !data?.data) {
        console.error(
          "Error al cancelar la suscripción:",
          error || "No se retornaron datos"
        );
        return false;
      }

      // Actualizamos el estado con la suscripción cancelada
      const updatedSubscription = data.data.subscription;
      setSub(updatedSubscription);

      // Si guardas la suscripción en localStorage, actualízala
      if (updatedSubscription) {
        localStorage.setItem(
          "subscripcion",
          JSON.stringify(updatedSubscription)
        );
      } else {
        localStorage.removeItem("subscripcion");
      }

      return true;
    } catch (err) {
      console.error("Excepción en desuscribirse:", err);
      return false;
    }
  };

  const fetchSub = async (): Promise<ISubscripcion | null> => {
    if (!user) return null;

    if (user.subscripcion) {
      setSub(user.subscripcion);
      return user.subscripcion;
    }

    const { data, error } = await handleAsync(api.get(`/users/sub/${user.id}`));

    if (error) {
      if (error.response?.status === 404) {
        return null;
      }
      console.error("Error al obtener la suscripción:", error);
      return null;
    }

    if (!data?.data) return null;

    setSub(data.data);
    return data.data;
  };

  useEffect(() => {
    if (!user) {
      setSub(null);
      localStorage.removeItem("subscripcion");
    } else {
      fetchSub();
    }
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
