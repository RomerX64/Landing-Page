"use client";
import React, {
  useState,
  ReactNode,
  useContext,
  useEffect,
  createContext,
  useCallback,
  useMemo,
} from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import api from "@/app/api/Api";
import { handleAsync } from "@/utils/error.helper";
import { UserContext } from "./user.context";
import { IPlan } from "@/interfaces/Plan.interface";
import { ISubscripcion } from "@/interfaces/Subscripcion.interface";

interface SuscribeContextProps {
  sub: ISubscripcion | null;
  planes: IPlan[];
  viewPlan: IPlan | null;
  suscribirse: (planId: number, paymentMethodToken: string) => Promise<void>;
  desuscribirse: () => Promise<void>;
  selectPlan: (planId: number) => Promise<IPlan | null>;
  changePlan: (direction: "next" | "prev") => void;
}

const defaultContext: SuscribeContextProps = {
  sub: null,
  planes: [],
  viewPlan: null,
  suscribirse: async () => {},
  desuscribirse: async () => {},
  selectPlan: async () => null,
  changePlan: () => {},
};

export const SuscribeContext =
  createContext<SuscribeContextProps>(defaultContext);

interface SuscribeProviderProps {
  children: ReactNode;
}

export const SuscribeProvider = ({ children }: SuscribeProviderProps) => {
  const { user } = useContext(UserContext);
  const [sub, setSub] = useState<ISubscripcion | null>(null);
  const [planes, setPlanes] = useState<IPlan[]>([]);
  const [viewPlan, setViewPlan] = useState<IPlan | null>(null);

  // Inicializamos el SDK de Mercado Pago con tu public key de prueba
  useEffect(() => {
    initMercadoPago("TEST-450aba78-55dc-4623-9975-99be4b21f666");
  }, []);

  // Función para obtener los planes desde la API o desde el localStorage
  const getPlanes = useCallback(async () => {
    try {
      const storedPlanes = localStorage.getItem("planes");
      if (storedPlanes) {
        const parsed = JSON.parse(storedPlanes) as IPlan[];
        setPlanes(parsed);
        console.log("Planes cargados desde LocalStorage");
        return;
      }

      const { data, error } = await handleAsync(api.get(`/users/planes`));
      if (error || !data?.data) {
        console.error(
          "Error al obtener planes:",
          error || "No se retornaron datos"
        );
        return;
      }

      const fetchedPlanes: IPlan[] = data.data;
      setPlanes(fetchedPlanes);
      localStorage.setItem("planes", JSON.stringify(fetchedPlanes));
    } catch (err) {
      console.error("Error en getPlanes:", err);
    }
  }, []);

  // Función para suscribirse a un plan
  const suscribirse = useCallback(
    async (planId: number, paymentMethodToken: string) => {
      try {
        const { data, error } = await handleAsync(
          api.post(`/subscriptions`, {
            planId,
            userEmail: user?.email,
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
    },
    [user]
  );

  // Función para cancelar la suscripción
  const desuscribirse = useCallback(async () => {
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
  }, [sub]);

  const selectPlan = useCallback(
    async (planId: number): Promise<IPlan | null> => {
      if (planes.length === 0) {
        await getPlanes();
      }
      const foundPlan = planes.find((plan) => plan.id === planId);
      if (!foundPlan) {
        console.error("Plan no encontrado");
        return null;
      }
      setViewPlan(foundPlan);
      localStorage.setItem("viewPlan", JSON.stringify(foundPlan));
      return foundPlan;
    },
    [planes, getPlanes]
  );

  const changePlan = useCallback(
    (direction: "next" | "prev") => {
      if (!viewPlan || planes.length === 0) return;
      const currentIndex = planes.findIndex((plan) => plan.id === viewPlan.id);
      if (currentIndex === -1) return;
      let newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
      if (newIndex < 0) newIndex = planes.length - 1;
      if (newIndex >= planes.length) newIndex = 0;
      const newPlan = planes[newIndex];
      setViewPlan(newPlan);
      localStorage.setItem("viewPlan", JSON.stringify(newPlan));
    },
    [planes, viewPlan]
  );

  // Carga inicial de la suscripción y los planes al montar o al cambiar el usuario
  useEffect(() => {
    const storedSub = localStorage.getItem("subscripcion");
    if (storedSub) {
      setSub(JSON.parse(storedSub));
    }
    getPlanes();
  }, [user, getPlanes]);

  useEffect(() => {
    if (planes.length > 0 && !viewPlan) {
      const storedViewPlan = localStorage.getItem("viewPlan");
      if (storedViewPlan) {
        setViewPlan(JSON.parse(storedViewPlan));
      } else {
        const popularPlan = planes.find((plan) => plan.popular === true);
        setViewPlan(popularPlan || planes[0]);
      }
    }
  }, [planes, viewPlan]);

  const value = useMemo(
    () => ({
      sub,
      planes,
      viewPlan,
      suscribirse,
      desuscribirse,
      selectPlan,
      changePlan,
    }),
    [sub, planes, viewPlan, suscribirse, desuscribirse, selectPlan, changePlan]
  );

  return (
    <SuscribeContext.Provider value={value}>
      {children}
    </SuscribeContext.Provider>
  );
};
