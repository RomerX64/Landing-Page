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
import { initMercadoPago } from "@mercadopago/sdk-react";

interface SubscriptionContextProps {
  sub: ISubscripcion | null;
  suscribirse: (
    planId: number,
    paymentMethodToken: string,
    email: string
  ) => Promise<{ success: boolean; error?: string }>;
  desuscribirse: (cancellationReason?: string) => Promise<boolean>;
  fetchSub: () => Promise<ISubscripcion | null>;
  isLoading: boolean;
  mpInitialized: boolean;
}

const defaultSubscriptionContext: SubscriptionContextProps = {
  sub: null,
  suscribirse: async () => ({ success: false }),
  desuscribirse: async () => false,
  fetchSub: async () => null,
  isLoading: false,
  mpInitialized: false,
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mpInitialized, setMpInitialized] = useState<boolean>(false);

  useEffect(() => {
    const initMP = () => {
      try {
        initMercadoPago("APP_USR-8c3216f3-8ec0-4106-9522-f580b88cf1c4");
        setMpInitialized(true);
        return true;
      } catch (error) {
        console.error("Error al inicializar Mercado Pago:", error);
        return false;
      }
    };

    initMP();
  }, []);

  const suscribirse = async (
    planId: number,
    paymentMethodToken: string,
    email: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      if (!mpInitialized) {
        return {
          success: false,
          error:
            "Error al inicializar el servicio de pagos. Por favor, recarga la página.",
        };
      }

      if (!user?.id) {
        return { success: false, error: "Usuario no identificado" };
      }

      const { data, error } = await handleAsync(
        api.post(`/subscriptions`, {
          planId,
          userEmail: email,
          paymentMethodToken,
          userId: user.email || email,
        })
      );

      if (error) {
        const errorMessage =
          error.response?.data?.message || "Error al procesar la suscripción";
        console.error("Error al suscribirse:", errorMessage);
        return { success: false, error: errorMessage };
      }

      if (!data?.data?.subscription) {
        return {
          success: false,
          error: "No se recibieron datos de la suscripción",
        };
      }

      const newSubscription: ISubscripcion = data.data.subscription;
      setSub(newSubscription);

      // Guardar en localStorage con la ID del usuario para no mezclar suscripciones
      localStorage.setItem(
        `subscripcion_${user.id}`,
        JSON.stringify(newSubscription)
      );
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.message || "Error inesperado al suscribirse";
      console.error("Excepción en suscribirse:", err);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  const desuscribirse = async (
    cancellationReason?: string
  ): Promise<boolean> => {
    setIsLoading(true);
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

      // Si hay un usuario, actualizar su suscripción en localStorage
      if (user?.id && updatedSubscription) {
        localStorage.setItem(
          `subscripcion_${user.id}`,
          JSON.stringify(updatedSubscription)
        );
      } else if (user?.id) {
        localStorage.removeItem(`subscripcion_${user.id}`);
      }

      return true;
    } catch (err) {
      console.error("Excepción en desuscribirse:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSub = async (): Promise<ISubscripcion | null> => {
    if (!user) {
      setSub(null);
      return null;
    }
    setIsLoading(true);

    try {
      if (user.subscripcion) {
        setSub(user.subscripcion);
        // También actualizar el localStorage
        localStorage.setItem(
          `subscripcion_${user.id}`,
          JSON.stringify(user.subscripcion)
        );
        return user.subscripcion;
      }

      const { data, error } = await handleAsync(
        api.get(`/users/sub/${user.id}`)
      );

      if (error) {
        if (error.response?.status === 404) {
          // Limpiar datos de suscripción si no existe
          setSub(null);
          localStorage.removeItem(`subscripcion_${user.id}`);
          return null;
        }
        console.error("Error al obtener la suscripción:", error);
        return null;
      }

      if (!data?.data) {
        // Limpiar datos de suscripción si no hay datos
        setSub(null);
        localStorage.removeItem(`subscripcion_${user.id}`);
        return null;
      }

      setSub(data.data);
      localStorage.setItem(
        `subscripcion_${user.id}`,
        JSON.stringify(data.data)
      );
      return data.data;
    } catch (err) {
      console.error("Error inesperado al obtener suscripción:", err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Efecto para manejar cambios en el usuario
  useEffect(() => {
    setSub(null);
    if (!user) return;

    const storedSub = localStorage.getItem(`subscripcion_${user.id}`);
    if (storedSub) {
      try {
        setSub(JSON.parse(storedSub));
      } catch (e) {
        console.error("Error al parsear suscripción del localStorage:", e);
      }
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
      isLoading,
      mpInitialized,
    }),
    [sub, isLoading, mpInitialized, user]
  );

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};
