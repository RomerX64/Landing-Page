(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_(default)_profile_layout_tsx_87d347._.js", {

"[project]/app/(default)/profile/layout.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "SuscribeContext": (()=>SuscribeContext),
    "SuscribeProvider": (()=>SuscribeProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$Api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/app/api/Api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$error$2e$helper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/utils/error.helper.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$user$2e$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/context/user.context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$mercadoPago$2f$initMercadoPago$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__initMercadoPago$3e$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/mercadoPago/initMercadoPago/index.js [app-client] (ecmascript) <export default as initMercadoPago>");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
const defaultContext = {
    sub: null,
    planes: [],
    viewPlan: null,
    suscribirse: async ()=>{},
    desuscribirse: async ()=>{},
    selectPlan: async ()=>null,
    changePlan: ()=>{},
    fetchSub: async ()=>null,
    fetchPlan: async ()=>null
};
const SuscribeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(defaultContext);
const SuscribeProvider = ({ children })=>{
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$context$2f$user$2e$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]);
    const [sub, setSub] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [planes, setPlanes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [viewPlan, setViewPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Inicializar MercadoPago solo una vez
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SuscribeProvider.useEffect": ()=>{
            const token = ("TURBOPACK compile-time value", "APP_USR-a88f991b-d04b-490f-b447-502303d60b9e");
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$mercadoPago$2f$initMercadoPago$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__initMercadoPago$3e$__["initMercadoPago"])(token || "");
        }
    }["SuscribeProvider.useEffect"], []);
    // Función para obtener planes
    const getPlanes = async ()=>{
        try {
            const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$error$2e$helper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleAsync"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$Api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/users/planes`));
            if (error || !data?.data) {
                console.error("Error al obtener planes:", error || "No se retornaron datos");
                return;
            }
            const fetchedPlanes = data.data;
            setPlanes(fetchedPlanes);
            localStorage.setItem("planes", JSON.stringify(fetchedPlanes));
            console.log("Planes actualizados desde la API");
        } catch (err) {
            console.error("Error en getPlanes:", err);
        }
    };
    const suscribirse = async (planId, paymentMethodToken, email)=>{
        try {
            const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$error$2e$helper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleAsync"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$Api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`/subscriptions`, {
                planId,
                userEmail: email,
                paymentMethodToken
            }));
            if (error || !data?.data?.subscription) {
                console.error("Error al suscribirse:", error || "No se retornaron datos");
                return;
            }
            const newSubscription = data.data.subscription;
            setSub(newSubscription);
            localStorage.setItem("subscripcion", JSON.stringify(newSubscription));
        } catch (err) {
            console.error("Excepción en suscribirse:", err);
        }
    };
    const desuscribirse = async ()=>{
        if (!sub) return;
        try {
            const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$error$2e$helper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleAsync"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$Api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].post(`/subscriptions/cancel`, {
                subscriptionId: sub.mercadopagoSubscriptionId,
                cancellationReason: "Cancelación solicitada por el usuario"
            }));
            if (error || !data?.data?.subscription) {
                console.error("Error al desuscribirse:", error || "No se retornaron datos");
                return;
            }
            setSub(null);
            localStorage.removeItem("subscripcion");
        } catch (err) {
            console.error("Excepción en desuscribirse:", err);
        }
    };
    const selectPlan = async (planId)=>{
        if (planes.length === 0) {
            await getPlanes();
        }
        const foundPlan = planes.find((plan)=>plan.id === planId);
        if (!foundPlan) {
            console.error("Plan no encontrado");
            return null;
        }
        setViewPlan(foundPlan);
        localStorage.setItem("viewPlan", JSON.stringify(foundPlan));
        return foundPlan;
    };
    const changePlan = (direction)=>{
        if (!viewPlan || planes.length === 0) return;
        const currentIndex = planes.findIndex((plan)=>plan.id === viewPlan.id);
        if (currentIndex === -1) return;
        let newIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;
        if (newIndex < 0) newIndex = planes.length - 1;
        if (newIndex >= planes.length) newIndex = 0;
        const newPlan = planes[newIndex];
        setViewPlan(newPlan);
        localStorage.setItem("viewPlan", JSON.stringify(newPlan));
    };
    // Cargar suscripción almacenada al cambiar el usuario
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SuscribeProvider.useEffect": ()=>{
            const storedSub = localStorage.getItem("subscripcion");
            if (storedSub) {
                setSub(JSON.parse(storedSub));
            }
        }
    }["SuscribeProvider.useEffect"], [
        user
    ]);
    // Cargar planes al montar el componente
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SuscribeProvider.useEffect": ()=>{
            getPlanes();
        }
    }["SuscribeProvider.useEffect"], []);
    // Seleccionar el plan de vista si aún no está seleccionado
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SuscribeProvider.useEffect": ()=>{
            if (planes.length > 0 && !viewPlan) {
                const storedViewPlan = localStorage.getItem("viewPlan");
                if (storedViewPlan) {
                    setViewPlan(JSON.parse(storedViewPlan));
                } else {
                    const popularPlan = planes.find({
                        "SuscribeProvider.useEffect.popularPlan": (plan)=>plan.popular === true
                    }["SuscribeProvider.useEffect.popularPlan"]);
                    setViewPlan(popularPlan || planes[0]);
                }
            }
        }
    }["SuscribeProvider.useEffect"], [
        planes,
        viewPlan
    ]);
    // Modificación de fetchSub: ahora siempre consulta la API y actualiza el estado
    const fetchSub = async ()=>{
        if (!user) return null;
        const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$error$2e$helper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleAsync"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$Api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/users/sub/${user.id}`));
        if (error || !data?.data) {
            console.error("Error al obtener suscripción:", error || "No se retornaron datos");
            return null;
        }
        const newSub = data.data;
        setSub(newSub);
        localStorage.setItem("subscripcion", JSON.stringify(newSub));
        // Se actualiza el plan utilizando la suscripción recién obtenida
        fetchPlan(newSub);
        return newSub;
    };
    // Se modifica fetchPlan para recibir opcionalmente la suscripción a usar
    const fetchPlan = async (subscription)=>{
        const currentSub = subscription || sub;
        if (!currentSub || !currentSub.plan) {
            console.error("No hay suscripción activa para obtener el plan.");
            return null;
        }
        const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$error$2e$helper$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleAsync"])(__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$api$2f$Api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get(`/users/plan/${currentSub.plan.id}`));
        console.log("Respuesta de la API del plan:", data);
        if (error || !data?.data) {
            console.error("Error al obtener el plan:", error || "No se retornaron datos");
            return null;
        }
        return data.data;
    };
    // Consultar la suscripción cuando el usuario esté disponible
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SuscribeProvider.useEffect": ()=>{
            if (!user) return;
            fetchSub();
        }
    }["SuscribeProvider.useEffect"], [
        user
    ]);
    const value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SuscribeProvider.useMemo[value]": ()=>({
                sub,
                planes,
                viewPlan,
                suscribirse,
                desuscribirse,
                selectPlan,
                changePlan,
                fetchSub,
                fetchPlan
            })
    }["SuscribeProvider.useMemo[value]"], [
        sub,
        planes,
        viewPlan,
        user
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SuscribeContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/app/(default)/profile/layout.tsx",
        lineNumber: 260,
        columnNumber: 5
    }, this);
};
_s(SuscribeProvider, "nj5e5S8kfkYfoLEqedH8M+XC8Ec=");
_c = SuscribeProvider;
var _c;
__turbopack_refresh__.register(_c, "SuscribeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(default)/profile/layout.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=app_%28default%29_profile_layout_tsx_87d347._.js.map