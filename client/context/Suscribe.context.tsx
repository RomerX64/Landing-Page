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
  suscribirse: (
    planId: number,
    paymentMethodToken: string,
    email: string
  ) => Promise<void>;
  desuscribirse: () => Promise<void>;
  selectPlan: (planId: number) => Promise<IPlan | null>;
  changePlan: (direction: "next" | "prev") => void;
  refreshSubscription: () => Promise<void>;
  refreshPlanes: () => Promise<void>;
  loading: boolean;
}

const defaultContext: SuscribeContextProps = {
  sub: null,
  planes: [],
  viewPlan: null,
  suscribirse: async () => {},
  desuscribirse: async () => {},
  selectPlan: async () => null,
  changePlan: () => {},
  refreshSubscription: async () => {},
  refreshPlanes: async () => {},
  loading: true,
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
  const [lastPlanesUpdate, setLastPlanesUpdate] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    initMercadoPago("APP_USR-a88f991b-d04b-490f-b447-502303d60b9e");
  }, []);

  const fetchSubscription = useCallback(
    async (forceRefresh = false) => {
      if (!user?.id) return null;

      try {
        // Comprobar si hay datos en localStorage primero
        const storedSub = localStorage.getItem("subscripcion");
        const storedSubTimestamp = localStorage.getItem(
          "subscripcionTimestamp"
        );
        const now = Date.now();
        const CACHE_DURATION = 1800000; // 30 minutos

        // Usar caché sólo si no se fuerza actualización, existe, y no ha caducado
        if (
          !forceRefresh &&
          storedSub &&
          storedSubTimestamp &&
          now - parseInt(storedSubTimestamp) < CACHE_DURATION
        ) {
          const parsed = JSON.parse(storedSub) as ISubscripcion;
          setSub(parsed);
          console.log("Suscripción cargada desde LocalStorage");
          return parsed;
        }

        // Si no hay caché o ha caducado, obtener de la API
        const { data, error } = await handleAsync(
          api.get(`/users/sub/${user.id}`)
        );

        if (error || !data?.data) {
          console.error(
            "Error al obtener la suscripción:",
            error || "No se retornaron datos"
          );

          // Si hay error pero tenemos datos en caché, usarlos como fallback
          if (storedSub) {
            const parsed = JSON.parse(storedSub) as ISubscripcion;
            setSub(parsed);
            return parsed;
          }

          return null;
        }

        const subscription: ISubscripcion = data.data;
        setSub(subscription);
        localStorage.setItem("subscripcion", JSON.stringify(subscription));
        localStorage.setItem("subscripcionTimestamp", now.toString());
        return subscription;
      } catch (err) {
        console.error("Error al obtener la suscripción:", err);

        // Intentar recuperar del localStorage en caso de error
        const storedSub = localStorage.getItem("subscripcion");
        if (storedSub) {
          try {
            const parsed = JSON.parse(storedSub) as ISubscripcion;
            setSub(parsed);
            return parsed;
          } catch (parseErr) {
            console.error(
              "Error al parsear la suscripción almacenada:",
              parseErr
            );
          }
        }

        return null;
      }
    },
    [user?.id]
  );

  const refreshSubscription = useCallback(async (): Promise<void> => {
    await fetchSubscription(true);
  }, [fetchSubscription]);

  const fetchPlanes = useCallback(async (forceRefresh = false) => {
    try {
      const now = Date.now();
      const CACHE_DURATION = 86400000; // 24 horas para los planes (cambian con menos frecuencia)

      const storedPlanes = localStorage.getItem("planes");
      const storedTimestamp = localStorage.getItem("planesTimestamp");

      if (
        !forceRefresh &&
        storedPlanes &&
        storedTimestamp &&
        now - parseInt(storedTimestamp) < CACHE_DURATION
      ) {
        const parsed = JSON.parse(storedPlanes) as IPlan[];
        setPlanes(parsed);
        setLastPlanesUpdate(parseInt(storedTimestamp));
        console.log("Planes cargados desde LocalStorage");
        return parsed;
      }

      const { data, error } = await handleAsync(api.get(`/users/planes`));
      if (error || !data?.data) {
        console.error(
          "Error al obtener planes:",
          error || "No se retornaron datos"
        );

        if (storedPlanes) {
          const parsed = JSON.parse(storedPlanes) as IPlan[];
          setPlanes(parsed);
          return parsed;
        }

        return [];
      }

      const fetchedPlanes: IPlan[] = data.data;
      setPlanes(fetchedPlanes);
      localStorage.setItem("planes", JSON.stringify(fetchedPlanes));
      localStorage.setItem("planesTimestamp", now.toString());
      setLastPlanesUpdate(now);

      return fetchedPlanes;
    } catch (err) {
      console.error("Error en fetchPlanes:", err);

      // Intentar recuperar del localStorage en caso de error
      const storedPlanes = localStorage.getItem("planes");
      if (storedPlanes) {
        try {
          const parsed = JSON.parse(storedPlanes) as IPlan[];
          setPlanes(parsed);
          return parsed;
        } catch (parseErr) {
          console.error("Error al parsear los planes almacenados:", parseErr);
        }
      }

      return [];
    }
  }, []);

  const refreshPlanes = useCallback(async (): Promise<void> => {
    await fetchPlanes(true);
  }, [fetchPlanes]);

  const suscribirse = useCallback(
    async (
      planId: number,
      paymentMethodToken: string,
      email: string
    ): Promise<void> => {
      try {
        setLoading(true);
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

        await refreshSubscription();
      } catch (err) {
        console.error("Excepción en suscribirse:", err);
      } finally {
        setLoading(false);
      }
    },
    [refreshSubscription]
  );

  const desuscribirse = useCallback(async (): Promise<void> => {
    if (!sub) return;
    try {
      setLoading(true);
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

      await refreshSubscription();
    } catch (err) {
      console.error("Excepción en desuscribirse:", err);
    } finally {
      setLoading(false);
    }
  }, [sub, refreshSubscription]);

  const selectPlan = useCallback(
    async (planId: number): Promise<IPlan | null> => {
      let availablePlanes = planes;

      if (availablePlanes.length === 0) {
        availablePlanes = await fetchPlanes();
      }

      const foundPlan = availablePlanes.find((plan) => plan.id === planId);

      if (!foundPlan) {
        console.error("Plan no encontrado");
        return null;
      }

      setViewPlan(foundPlan);
      localStorage.setItem("viewPlan", JSON.stringify(foundPlan));
      return foundPlan;
    },
    [planes, fetchPlanes]
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

  // Carga inicial de datos
  useEffect(() => {
    const initializeData = async () => {
      if (initialized) return;
      setLoading(true);

      try {
        // Primero intentamos cargar del localStorage para mostrar algo rápido
        const storedPlanes = localStorage.getItem("planes");
        const storedSub = localStorage.getItem("subscripcion");

        let planesLoaded = false;
        let subLoaded = false;

        if (storedPlanes) {
          try {
            const parsed = JSON.parse(storedPlanes) as IPlan[];
            setPlanes(parsed);
            planesLoaded = true;
          } catch (err) {
            console.error("Error al parsear planes almacenados:", err);
          }
        }

        if (storedSub) {
          try {
            const parsed = JSON.parse(storedSub) as ISubscripcion;
            setSub(parsed);
            subLoaded = true;
          } catch (err) {
            console.error("Error al parsear suscripción almacenada:", err);
          }
        }

        // Luego, si el usuario está autenticado, actualizamos desde la API
        if (user?.id) {
          // Utilizamos Promise.all para hacer las peticiones en paralelo
          await Promise.all([
            !planesLoaded ? fetchPlanes() : Promise.resolve(),
            !subLoaded ? fetchSubscription() : Promise.resolve(),
          ]);
        } else if (!planesLoaded) {
          // Si no hay usuario pero necesitamos los planes
          await fetchPlanes();
        }

        setInitialized(true);
      } catch (err) {
        console.error("Error al inicializar datos:", err);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [user?.id, fetchPlanes, fetchSubscription, initialized]);

  // Efecto para actualizar cuando cambia el usuario
  useEffect(() => {
    if (!initialized) return;

    if (user?.id) {
      const updateUserData = async () => {
        setLoading(true);
        try {
          await fetchSubscription();
        } finally {
          setLoading(false);
        }
      };

      updateUserData();
    } else {
      setSub(null);
    }
  }, [user?.id, fetchSubscription, initialized]);

  // Configurar el plan visible tras cargar los planes
  useEffect(() => {
    if (planes.length > 0 && !viewPlan) {
      const storedViewPlan = localStorage.getItem("viewPlan");
      if (storedViewPlan) {
        try {
          const parsedPlan = JSON.parse(storedViewPlan) as IPlan;
          const planExists = planes.some((plan) => plan.id === parsedPlan.id);
          if (planExists) {
            setViewPlan(parsedPlan);
          } else {
            const popularPlan = planes.find((plan) => plan.popular === true);
            setViewPlan(popularPlan || planes[0]);
          }
        } catch (err) {
          console.error("Error al parsear el plan almacenado:", err);
          const popularPlan = planes.find((plan) => plan.popular === true);
          setViewPlan(popularPlan || planes[0]);
        }
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
      refreshSubscription,
      refreshPlanes,
      loading,
    }),
    [
      sub,
      planes,
      viewPlan,
      suscribirse,
      desuscribirse,
      selectPlan,
      changePlan,
      refreshSubscription,
      refreshPlanes,
      loading,
    ]
  );

  return (
    <SuscribeContext.Provider value={value}>
      {children}
    </SuscribeContext.Provider>
  );
};
