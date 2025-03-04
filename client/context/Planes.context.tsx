"use client";
import React, { useState, createContext, useEffect, useMemo } from "react";
import api from "@/utils/Api";
import { handleAsync } from "@/utils/error.helper";
import { IPlan } from "@/interfaces/Plan.interface";

interface PlansContextProps {
  planes: IPlan[];
  viewPlan: IPlan | null;
  selectPlan: (planId: number) => Promise<IPlan | null>;
  changePlan: (direction: "next" | "prev") => void;
  getPlanes: () => Promise<void>;
}

const defaultPlansContext: PlansContextProps = {
  planes: [],
  viewPlan: null,
  selectPlan: async () => null,
  changePlan: () => {},
  getPlanes: async () => {},
};

export const PlansContext =
  createContext<PlansContextProps>(defaultPlansContext);

export const PlansProvider = ({ children }: { children: React.ReactNode }) => {
  const [planes, setPlanes] = useState<IPlan[]>([]);
  const [viewPlan, setViewPlan] = useState<IPlan | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getPlanes = async () => {
    if (loading) return;

    setLoading(true);
    try {
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
    } finally {
      setLoading(false);
    }
  };

  const selectPlan = async (planId: number): Promise<IPlan | null> => {
    if (planes.length === 0) {
      await getPlanes();
    }

    const foundPlan = planes.find((plan) => plan.id === planId);
    if (!foundPlan) {
      console.error("Plan no encontrado con ID:", planId);
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

    // Manejar el ciclo circular
    if (newIndex < 0) newIndex = planes.length - 1;
    if (newIndex >= planes.length) newIndex = 0;

    const newPlan = planes[newIndex];
    setViewPlan(newPlan);
    localStorage.setItem("viewPlan", JSON.stringify(newPlan));
  };

  // Cargar planes al montar el componente
  useEffect(() => {
    const loadInitialData = async () => {
      // Intentar cargar desde localStorage primero
      const storedPlanes = localStorage.getItem("planes");

      if (storedPlanes) {
        try {
          const parsedPlanes = JSON.parse(storedPlanes);
          setPlanes(parsedPlanes);
        } catch (e) {
          console.error("Error al parsear planes del localStorage:", e);
          await getPlanes();
        }
      } else {
        await getPlanes();
      }
    };

    loadInitialData();
  }, []);

  // Establecer el plan de visualización cuando los planes están disponibles
  useEffect(() => {
    if (planes.length > 0 && !viewPlan) {
      const storedViewPlan = localStorage.getItem("viewPlan");

      if (storedViewPlan) {
        try {
          setViewPlan(JSON.parse(storedViewPlan));
        } catch (e) {
          console.error("Error al parsear viewPlan del localStorage:", e);
          setDefaultPlan();
        }
      } else {
        setDefaultPlan();
      }
    }
  }, [planes, viewPlan]);

  // Función auxiliar para establecer el plan predeterminado
  const setDefaultPlan = () => {
    const popularPlan = planes.find((plan) => plan.popular === true);
    setViewPlan(popularPlan || planes[0]);

    if (popularPlan || planes[0]) {
      localStorage.setItem(
        "viewPlan",
        JSON.stringify(popularPlan || planes[0])
      );
    }
  };

  const value = useMemo(
    () => ({
      planes,
      viewPlan,
      selectPlan,
      changePlan,
      getPlanes,
    }),
    [planes, viewPlan]
  );

  return (
    <PlansContext.Provider value={value}>{children}</PlansContext.Provider>
  );
};
