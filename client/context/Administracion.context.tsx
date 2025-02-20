"use client";
import React, { createContext, ReactNode } from "react";
import api from "@/app/api/Api";
import { handleAsync } from "@/utils/error.helper";

// Puedes definir aquí tus interfaces para CreatePlanDto, UpdatePlanDto y SubscriptionStatus
// o bien importarlas desde algún archivo de tipos si las tienes definidas.

interface AdminContextProps {
  // Funciones para usuarios
  getUsers: () => Promise<any[]>;
  getUsersSubscribed: () => Promise<any[]>;
  getUsersSubscribedAt: (planId: number) => Promise<any[]>;
  putAdmin: (userId: string) => Promise<any>;
  // Funciones para planes
  getAllPlans: () => Promise<any[]>;
  createPlan: (plan: any) => Promise<any>;
  updatePlan: (planId: number, plan: any) => Promise<any>;
  deletePlan: (planId: number) => Promise<void>;
  // Funciones para suscripciones
  getAllSubscriptions: () => Promise<any[]>;
  getSubscriptionById: (subscriptionId: string) => Promise<any>;
  updateSubscriptionStatus: (
    subscriptionId: string,
    status: string
  ) => Promise<any>;
  cancelSubscription: (subscriptionId: string, reason: string) => Promise<any>;
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
  putAdmin: async (_userId: string) => {
    throw new Error("Not implemented");
  },
  getAllPlans: async () => {
    throw new Error("Not implemented");
  },
  createPlan: async (_plan: any) => {
    throw new Error("Not implemented");
  },
  updatePlan: async (_planId: number, _plan: any) => {
    throw new Error("Not implemented");
  },
  deletePlan: async (_planId: number) => {
    throw new Error("Not implemented");
  },
  getAllSubscriptions: async () => {
    throw new Error("Not implemented");
  },
  getSubscriptionById: async (_subscriptionId: string) => {
    throw new Error("Not implemented");
  },
  updateSubscriptionStatus: async (
    _subscriptionId: string,
    _status: string
  ) => {
    throw new Error("Not implemented");
  },
  cancelSubscription: async (_subscriptionId: string, _reason: string) => {
    throw new Error("Not implemented");
  },
};

export const AdminContext = createContext<AdminContextProps>(defaultContext);

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider = ({ children }: AdminProviderProps) => {
  // Funciones de Usuarios

  const getUsers = async (): Promise<any[]> => {
    const cached = localStorage.getItem("admin_users");
    if (cached) {
      console.log("Cargando usuarios desde localStorage...");
      return JSON.parse(cached);
    }
    const { data, error } = await handleAsync(api.get("/admin/users"));
    if (error || !data) {
      throw new Error(error?.message || "Error al obtener los usuarios.");
    }
    localStorage.setItem("admin_users", JSON.stringify(data.data));
    return data.data;
  };

  const getUsersSubscribed = async (): Promise<any[]> => {
    const cached = localStorage.getItem("admin_usersSubscribed");
    if (cached) {
      console.log("Cargando usuarios suscritos desde localStorage...");
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

  const getUsersSubscribedAt = async (planId: number): Promise<any[]> => {
    const cacheKey = `admin_usersSubscribed_plan_${planId}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      console.log(
        `Cargando usuarios suscritos al plan ${planId} desde localStorage...`
      );
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

  const putAdmin = async (userId: string): Promise<any> => {
    const { data, error } = await handleAsync(
      api.put(`/admin/admin/${userId}`)
    );
    if (error || !data) {
      throw new Error(error?.message || "Error al asignar rol admin.");
    }
    return data.data;
  };

  // Funciones para Planes

  const getAllPlans = async (): Promise<any[]> => {
    const { data, error } = await handleAsync(api.get("/admin/plans"));
    if (error || !data) {
      throw new Error(error?.message || "Error al obtener los planes.");
    }
    return data.data;
  };

  const createPlan = async (plan: any): Promise<any> => {
    const { data, error } = await handleAsync(api.post("/admin/plan", plan));
    if (error || !data) {
      throw new Error(error?.message || "Error al crear el plan.");
    }
    return data.data;
  };

  const updatePlan = async (planId: number, plan: any): Promise<any> => {
    const { data, error } = await handleAsync(
      api.put(`/admin/plan/${planId}`, plan)
    );
    if (error || !data) {
      throw new Error(error?.message || "Error al actualizar el plan.");
    }
    return data.data;
  };

  const deletePlan = async (planId: number): Promise<void> => {
    const { error } = await handleAsync(api.delete(`/admin/plan/${planId}`));
    if (error) {
      throw new Error(error?.message || "Error al eliminar el plan.");
    }
  };

  // Funciones para Suscripciones

  const getAllSubscriptions = async (): Promise<any[]> => {
    const { data, error } = await handleAsync(api.get("/admin/subscriptions"));
    if (error || !data) {
      throw new Error(error?.message || "Error al obtener las suscripciones.");
    }
    return data.data;
  };

  const getSubscriptionById = async (subscriptionId: string): Promise<any> => {
    const { data, error } = await handleAsync(
      api.get(`/admin/subscription/${subscriptionId}`)
    );
    if (error || !data) {
      throw new Error(error?.message || "Error al obtener la suscripción.");
    }
    return data.data;
  };

  const updateSubscriptionStatus = async (
    subscriptionId: string,
    status: string
  ): Promise<any> => {
    const { data, error } = await handleAsync(
      api.put(`/admin/subscription/${subscriptionId}/status`, { status })
    );
    if (error || !data) {
      throw new Error(
        error?.message || "Error al actualizar el estado de la suscripción."
      );
    }
    return data.data;
  };

  const cancelSubscription = async (
    subscriptionId: string,
    reason: string
  ): Promise<any> => {
    const { data, error } = await handleAsync(
      api.put(`/admin/subscription/${subscriptionId}/cancel`, { reason })
    );
    if (error || !data) {
      throw new Error(error?.message || "Error al cancelar la suscripción.");
    }
    return data.data;
  };

  const value: AdminContextProps = {
    getUsers,
    getUsersSubscribed,
    getUsersSubscribedAt,
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
