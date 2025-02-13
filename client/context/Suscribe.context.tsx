"use client";
import React, {
  useState,
  ReactNode,
  useContext,
  useEffect,
  createContext,
} from "react";
import api from "@/app/api/Api";
import { handleAsync } from "@/utils/error.helper";
import { UserContext } from "./user.context";
import { IPlan } from "@/interfaces/Plan.interface";
import { ISubscripcion } from "@/interfaces/Subscripcion.interface";

interface SuscribeContextProps {
  sub: ISubscripcion | null;
  planes: IPlan[];
  viewPlan: IPlan | null;
  /**
   * Función para suscribirse.
   * Ahora requiere el `planId` y el `paymentMethodToken` obtenido desde el formulario de pago.
   */
  suscribirse: (planId: number, paymentMethodToken: string) => void;
  desuscribirse: () => void;
  selectPlan: (planId: number) => Promise<IPlan | null>;
  changePlan: (direction: "next" | "prev") => void;
}

const defaultContext: SuscribeContextProps = {
  sub: null,
  planes: [],
  suscribirse: () => {},
  desuscribirse: () => {},
  selectPlan: async () => null,
  viewPlan: null,
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

  const suscribirse = async (planId: number, paymentMethodToken: string) => {
    const { data, error } = await handleAsync(
      api.post(`/subscriptions`, {
        planId,
        userEmail: user?.email,
        paymentMethodToken,
      })
    );

<<<<<<< HEAD
    if (error || !data || !data) {
      console.error("Error suscribiéndose:", error || "No se retornaron datos");
      return;
=======
    if (error || !data) {
      throw new Error(error.message || "Hubo un error al iniciar sesión.");
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
    }

    setSub(data.data.subscription);
    localStorage.setItem(
      "subscripcion",
      JSON.stringify(data.data.subscription)
    );
  };

  const desuscribirse = async () => {
    if (!sub) return;
    const { data, error } = await handleAsync(
      api.post(`/subscriptions/cancel`, {
        subscriptionId: sub.mercadopagoSubscriptionId,
        cancellationReason: "Cancelación solicitada por el usuario",
      })
    );

<<<<<<< HEAD
    if (error || !data || !data.data.subscription) {
      console.error(
        "Error al desuscribirse:",
        error || "No se retornaron datos"
      );
      return;
=======
    if (error || !data) {
      throw new Error(error.message || "Hubo un error al iniciar sesión.");
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
    }

    setSub(null);
    localStorage.removeItem("subscripcion");
  };

  const getPlanes = async () => {
    const storedPlanes = localStorage.getItem("planes");

    if (storedPlanes) {
      const parsed = JSON.parse(storedPlanes);
      setPlanes(parsed);
      console.log("Planes cargados desde LocalStorage");
      return;
    }

    const { data, error } = await handleAsync(api.get(`/users/planes`));

<<<<<<< HEAD
    if (error || !data || !data.data) {
      console.error(
        "Error al obtener los datos del plan:",
        error || "No se retornaron datos"
      );
      return;
=======
    if (error || !data) {
      throw new Error(error.message || "Hubo un error al iniciar sesión.");
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
    }

    const planesReturned: IPlan[] = data.data;
    setPlanes(planesReturned);
    localStorage.setItem("planes", JSON.stringify(planesReturned));
  };

  const selectPlan = async (planId: number): Promise<IPlan | null> => {
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
  };

  const changePlan = (direction: "next" | "prev") => {
    if (!viewPlan || planes.length === 0) return;

    const currentIndex = planes.findIndex((plan) => plan.id === viewPlan.id);
    if (currentIndex === -1) return;

    let newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (newIndex < 0) newIndex = planes.length - 1;
    if (newIndex >= planes.length) newIndex = 0;

    const newPlan = planes[newIndex];
    setViewPlan(newPlan);
    localStorage.setItem("viewPlan", JSON.stringify(newPlan));
  };

  useEffect(() => {
    const storedSub = localStorage.getItem("subscripcion");
    if (storedSub) {
      setSub(JSON.parse(storedSub));
    }
    getPlanes();
  }, [user]);

  useEffect(() => {
    if (planes.length > 0 && viewPlan === null) {
      const storedViewPlan = localStorage.getItem("viewPlan");
      if (storedViewPlan) {
        setViewPlan(JSON.parse(storedViewPlan));
      } else {
        const popularPlan = planes.find((plan) => plan.popular === true);
        if (popularPlan) {
          setViewPlan(popularPlan);
        } else {
          setViewPlan(planes[0]);
        }
      }
    }
  }, [planes, viewPlan]);

  const value: SuscribeContextProps = {
    sub,
    planes,
    suscribirse,
    desuscribirse,
    selectPlan,
    viewPlan,
    changePlan,
  };

  return (
    <SuscribeContext.Provider value={value}>
      {children}
    </SuscribeContext.Provider>
  );
};
