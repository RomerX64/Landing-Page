"use client";
import React, { createContext, ReactNode } from "react";
import api from "@/utils/Api";
import { handleAsync } from "@/utils/error.helper";
import { IUser } from "@/interfaces/User.interface";
import { IPlan } from "@/interfaces/Plan.interface";
import { ISubscripcion } from "@/interfaces/Subscripcion.interface";
import { AdminContextProps } from "./DTO/AdminContextProps.interface";

const defaultContext: AdminContextProps = {
  getUsers: async () => {
    throw new Error("Not implemented");
  },
  getUsersSubscribed: async () => {
    throw new Error("Not implemented");
  },
  getUsersSubscribedAt: async () => {
    throw new Error("Not implemented");
  },
  getUser: async () => {
    throw new Error("Not implemented");
  },
  putAdmin: async () => {
    throw new Error("Not implemented");
  },
  getAllPlans: async () => {
    throw new Error("Not implemented");
  },
  createPlan: async () => {
    throw new Error("Not implemented");
  },
  updatePlan: async () => {
    throw new Error("Not implemented");
  },
  deletePlan: async () => {
    throw new Error("Not implemented");
  },
  getAllSubscriptions: async () => {
    throw new Error("Not implemented");
  },
  getSubscriptionById: async () => {
    throw new Error("Not implemented");
  },
  updateSubscriptionStatus: async () => {
    throw new Error("Not implemented");
  },
  cancelSubscription: async () => {
    throw new Error("Not implemented");
  },
};

export const AdminContext = createContext<AdminContextProps>(defaultContext);

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider = ({ children }: AdminProviderProps) => {
  const getUsers = async (): Promise<IUser[]> => {
    const cachedStr = localStorage.getItem("admin_users");
    const cached = cachedStr ? JSON.parse(cachedStr) : null;

    const currentTime = new Date().getTime();
    const expirationTime = 10 * 60 * 1000; // 10 minutos en milisegundos

    // Si no hay datos en caché o han caducado
    if (!cached || currentTime - cached.timestamp > expirationTime) {
      const { data, error } = await handleAsync(api.get("/admin/users"));
      if (error || !data) {
        throw new Error(error?.message || "Error al obtener los usuarios.");
      }

      // Guardamos los datos con la marca de tiempo de cuando fueron obtenidos
      localStorage.setItem(
        "admin_users",
        JSON.stringify({
          data: data.data,
          timestamp: currentTime,
        })
      );

      return data.data;
    }

    // Si los datos no han caducado, los devolvemos
    return cached.data;
  };

  const getUsersSubscribed = async (): Promise<IUser[]> => {
    const cached = localStorage.getItem("admin_usersSubscribed");
    if (cached) {
      return JSON.parse(cached);
    }
    const { data, error } = await handleAsync(
      api.get("/admin/getUsersSubscribed")
    );
    if (error || !data) {
      throw new Error(error?.message || "Error al obtener usuarios suscritos.");
    }
    localStorage.setItem("admin_usersSubscribed", JSON.stringify(data.data));
    return data.data;
  };

  const getUsersSubscribedAt = async (planId: number): Promise<IUser[]> => {
    const cacheKey = `admin_usersSubscribed_plan_${planId}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
    const { data, error } = await handleAsync(
      api.get(`/admin/getUsersSubscribed/${planId}`)
    );
    if (error || !data) {
      throw new Error(
        error?.message || "Error al obtener usuarios suscritos al plan."
      );
    }
    localStorage.setItem(cacheKey, JSON.stringify(data.data));
    return data.data;
  };

  const getUser = async (userId: string): Promise<IUser> => {
    const { data, error } = await handleAsync(api.get(`/admin/user/${userId}`));
    if (error || !data) {
      throw new Error(error?.message || "Error al obtener el usuario.");
    }
    return data.data;
  };

  const putAdmin = async (userId: string): Promise<IUser> => {
    const { data, error } = await handleAsync(
      api.put(`/admin/admin/${userId}`)
    );
    if (error || !data) {
      throw new Error(error?.message || "Error al asignar rol admin.");
    }
    return data.data;
  };

  // Funciones de Planes
  const getAllPlans = async (): Promise<IPlan[]> => {
    const cached = localStorage.getItem("admin_plans");
    if (cached) {
      return JSON.parse(cached);
    }
    const { data, error } = await handleAsync(api.get("/admin/plans"));
    if (error || !data) {
      throw new Error(error?.message || "Error al obtener planes.");
    }
    localStorage.setItem("admin_plans", JSON.stringify(data.data));
    return data.data;
  };

  const createPlan = async (plan: Omit<IPlan, "id">): Promise<IPlan> => {
    const { data, error } = await handleAsync(api.post("/admin/plans", plan));
    if (error || !data) {
      throw new Error(error?.message || "Error al crear plan.");
    }
    localStorage.removeItem("admin_plans");
    return data.data;
  };

  const updatePlan = async (
    planId: number,
    plan: Partial<IPlan>
  ): Promise<IPlan> => {
    const { data, error } = await handleAsync(
      api.put(`/admin/plans/${planId}`, plan)
    );
    if (error || !data) {
      throw new Error(error?.message || "Error al actualizar plan.");
    }
    localStorage.removeItem("admin_plans");
    return data.data;
  };

  const deletePlan = async (planId: number): Promise<void> => {
    const { error } = await handleAsync(api.delete(`/admin/plans/${planId}`));
    if (error) {
      throw new Error(error.message || "Error al eliminar plan.");
    }
    localStorage.removeItem("admin_plans");
  };

  // Funciones de Suscripciones
  const getAllSubscriptions = async (): Promise<ISubscripcion[]> => {
    const cachedStr = localStorage.getItem("admin_subscriptions");
    const cached: ISubscripcion[] = cachedStr ? JSON.parse(cachedStr) : [];

    const { data, error } = await handleAsync(api.get("/admin/subscriptions"));
    if (error || !data) {
      throw new Error(error?.message || "Error al obtener suscripciones.");
    }

    if (cached.length < data.data.length) {
      localStorage.setItem("admin_subscriptions", JSON.stringify(data.data));
      return data.data;
    }
    return cached;
  };

  const getSubscriptionById = async (
    subscriptionId: string
  ): Promise<ISubscripcion> => {
    const { data, error } = await handleAsync(
      api.get(`/admin/subscription/${subscriptionId}`)
    );
    if (error || !data) {
      throw new Error(error?.message || "Error al obtener suscripción.");
    }
    return data.data;
  };

  const updateSubscriptionStatus = async (
    subscriptionId: string,
    status: ISubscripcion["status"]
  ): Promise<ISubscripcion> => {
    const { data, error } = await handleAsync(
      api.put(`/admin/subscription/${subscriptionId}/status`, { status })
    );
    if (error || !data) {
      throw new Error(
        error?.message || "Error al actualizar estado de suscripción."
      );
    }
    localStorage.removeItem("admin_subscriptions");
    return data.data;
  };

  const cancelSubscription = async (
    subscriptionId: string,
    reason: string
  ): Promise<ISubscripcion> => {
    const { data, error } = await handleAsync(
      api.put(`/admin/subscription/${subscriptionId}/cancel`, { reason })
    );
    if (error || !data) {
      throw new Error(error?.message || "Error al cancelar suscripción.");
    }
    localStorage.removeItem("admin_subscriptions");
    return data.data;
  };

  const value: AdminContextProps = {
    getUsers,
    getUsersSubscribed,
    getUsersSubscribedAt,
    getUser,
    putAdmin,
    getAllPlans,
    createPlan,
    updatePlan,
    deletePlan,
    getAllSubscriptions,
    getSubscriptionById,
    updateSubscriptionStatus,
    cancelSubscription,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};
