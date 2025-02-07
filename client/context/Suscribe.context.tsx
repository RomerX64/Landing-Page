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
  suscribirse: (planId: number) => void;
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

  const suscribirse = async (planId: number) => {
    const { data, error } = await handleAsync(
      api.get(`users/suscribe/${user?.id}/${planId}`)
    );

    if (error || !data || !data.data) {
      console.error("Error suscribiéndose:", error || "No data returned");
      return;
    }

    setSub(data.data);
    localStorage.setItem("subscripcion", JSON.stringify(data.data));
  };

  const desuscribirse = async () => {
    const { data, error } = await handleAsync(
      api.get(`/users/desuscribe/${user?.id}`)
    );

    if (error || !data || !data.data) {
      console.error("Error al desuscribirse:", error || "No data returned");
      return;
    }

    setSub(null);
    localStorage.removeItem("subscripcion");
  };

  const getPlanes = async () => {
    const storedPlanes = localStorage.getItem("planes");

    if (storedPlanes) {
      const parsed = JSON.parse(storedPlanes);
      setPlanes(parsed);
      console.log("Planes Cargados");
      return;
    }

    const { data, error } = await handleAsync(api.get(`/users/planes`));

    if (error || !data || !data.data) {
      console.error(
        "Error al obtener los datos del plan:",
        error || "No data returned"
      );
      return;
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
    localStorage.setItem("viewPlan", JSON.stringify(foundPlan)); // Guardamos el plan seleccionado en localStorage
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
    localStorage.setItem("viewPlan", JSON.stringify(newPlan)); // Actualizamos el plan en localStorage
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
        setViewPlan(JSON.parse(storedViewPlan)); // Recuperamos el plan desde localStorage
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
