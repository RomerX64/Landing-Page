(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_9defdc._.js", {

"[project]/app/(default)/suscribirse/layout.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/index.js [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$Suscribe$2e$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/context/Suscribe.context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$Planes$2e$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/context/Planes.context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$cardPayment$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardPayment$3e$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/bricks/cardPayment/index.js [app-client] (ecmascript) <export default as CardPayment>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
;
const PaymentForm = ()=>{
    _s();
    const { suscribirse, sub, isLoading, mpInitialized } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$context$2f$Suscribe$2e$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubscriptionContext"]);
    const { viewPlan } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$context$2f$Planes$2e$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PlansContext"]);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [paymentProcessing, setPaymentProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [progress, setProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    // Referencia para el contenedor del CardPayment
    const paymentContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Referencia para mantener el formData
    const formDataRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Effect to handle successful subscription and redirect
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PaymentForm.useEffect": ()=>{
            if (sub && sub.id) {
                // Reset progress to full
                setProgress(100);
                // Short delay to allow progress bar to complete visually
                const redirectTimer = setTimeout({
                    "PaymentForm.useEffect.redirectTimer": ()=>{
                        router.push("/success");
                    }
                }["PaymentForm.useEffect.redirectTimer"], 500);
                return ({
                    "PaymentForm.useEffect": ()=>clearTimeout(redirectTimer)
                })["PaymentForm.useEffect"];
            }
        }
    }["PaymentForm.useEffect"], [
        sub,
        router
    ]);
    // Verificar si MercadoPago está inicializado
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PaymentForm.useEffect": ()=>{
            if (!mpInitialized) {
                setError("No se pudo inicializar el servicio de pago. Verifica que la clave pública esté configurada correctamente.");
            } else if (error === "No se pudo inicializar el servicio de pago. Verifica que la clave pública esté configurada correctamente.") {
                setError(null);
            }
        }
    }["PaymentForm.useEffect"], [
        mpInitialized
    ]);
    // Progress bar effect during payment processing
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PaymentForm.useEffect": ()=>{
            let progressInterval;
            if (paymentProcessing) {
                // En lugar de quitar el componente, ocultamos el contenedor con CSS
                if (paymentContainerRef.current) {
                    paymentContainerRef.current.style.display = "none";
                }
                progressInterval = setInterval({
                    "PaymentForm.useEffect": ()=>{
                        setProgress({
                            "PaymentForm.useEffect": (prevProgress)=>{
                                if (prevProgress >= 90) {
                                    clearInterval(progressInterval);
                                    return 90;
                                }
                                return prevProgress + 10;
                            }
                        }["PaymentForm.useEffect"]);
                    }
                }["PaymentForm.useEffect"], 500);
            } else {
                // Volvemos a mostrar el contenedor cuando no está procesando
                if (paymentContainerRef.current) {
                    paymentContainerRef.current.style.display = "";
                }
            }
            return ({
                "PaymentForm.useEffect": ()=>{
                    if (progressInterval) clearInterval(progressInterval);
                }
            })["PaymentForm.useEffect"];
        }
    }["PaymentForm.useEffect"], [
        paymentProcessing
    ]);
    const validateCardData = (formData)=>{
        if (!formData.token) {
            setError("Falta el token de la tarjeta.");
            return false;
        }
        if (!formData.payment_method_id) {
            setError("Método de pago no seleccionado.");
            return false;
        }
        if (!formData.payer?.email) {
            setError("Falta el email del pagador.");
            return false;
        }
        return true;
    };
    const handleRetry = ()=>{
        setError(null);
        setPaymentProcessing(false);
        setProgress(0);
        window.location.reload(); // Recargamos la página para reiniciar MercadoPago si es necesario
    };
    const handleFormSubmit = async (formData, additionalData)=>{
        if (!mpInitialized) {
            setError("El servicio de pago no está inicializado. Por favor, recarga la página.");
            return;
        }
        if (!viewPlan) {
            setError("No se ha seleccionado un plan.");
            return;
        }
        // Guardamos el formData en la referencia
        formDataRef.current = formData;
        if (!validateCardData(formData)) return;
        try {
            const paymentMethodToken = formData.token;
            // Verificamos que el email existe antes de usarlo
            const email = formData.payer?.email;
            if (!email) {
                setError("Falta el email del pagador.");
                return;
            }
            setPaymentProcessing(true);
            setProgress(10);
            const result = await suscribirse(viewPlan.id, paymentMethodToken, email);
            if (!result.success) {
                setError(result.error || "Hubo un error al procesar la suscripción.");
                setPaymentProcessing(false);
                setProgress(0);
            }
        } catch (error) {
            console.error("Error al procesar el pago:", error);
            setError(error.message || "Hubo un error al procesar el pago. Intenta nuevamente.");
            setPaymentProcessing(false);
            setProgress(0);
        }
    };
    // Si MercadoPago no está inicializado, mostramos un mensaje específico
    if (!mpInitialized) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "w-10/12 max-w-3xl px-1 py-5 mx-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-8 bg-gray-800 shadow-2xl rounded-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.back(),
                                className: "p-2 mr-4 text-white bg-gray-700 rounded-full hover:bg-gray-600",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                    size: 24
                                }, void 0, false, {
                                    fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                                    lineNumber: 177,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                                lineNumber: 173,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400",
                                children: "Completa tu Pago"
                            }, void 0, false, {
                                fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                                lineNumber: 179,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                        lineNumber: 172,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                className: "w-16 h-16 mx-auto mb-4 text-yellow-400"
                            }, void 0, false, {
                                fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                                lineNumber: 185,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "mb-2 text-xl font-bold text-white",
                                children: "Error al inicializar el servicio de pago"
                            }, void 0, false, {
                                fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                                lineNumber: 186,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-6 text-gray-300",
                                children: "No se pudo inicializar el servicio de pagos. Esto puede suceder si la clave pública no está configurada correctamente."
                            }, void 0, false, {
                                fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                                lineNumber: 189,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>window.location.reload(),
                                className: "flex items-center justify-center px-4 py-2 mx-auto font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                        className: "w-4 h-4 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                                        lineNumber: 197,
                                        columnNumber: 15
                                    }, this),
                                    " Reintentar"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                                lineNumber: 193,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                        lineNumber: 184,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                lineNumber: 171,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/(default)/suscribirse/layout.tsx",
            lineNumber: 170,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "w-10/12 max-w-3xl px-1 py-5 mx-auto",
        children: [
            (paymentProcessing || progress > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-0 left-0 z-50 h-1 transition-all duration-300 ease-out bg-blue-500",
                style: {
                    width: `${progress}%`
                }
            }, void 0, false, {
                fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                lineNumber: 209,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-8 bg-gray-800 shadow-2xl rounded-2xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>router.back(),
                                className: "p-2 mr-4 text-white bg-gray-700 rounded-full hover:bg-gray-600",
                                disabled: paymentProcessing || isLoading,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {
                                    size: 24
                                }, void 0, false, {
                                    fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                                    lineNumber: 222,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                                lineNumber: 217,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400",
                                children: "Completa tu Pago"
                            }, void 0, false, {
                                fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                                lineNumber: 224,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                        lineNumber: 216,
                        columnNumber: 9
                    }, this),
                    viewPlan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-300",
                            children: [
                                "Estás suscribiéndote al plan",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold",
                                    children: viewPlan.name
                                }, void 0, false, {
                                    fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                                    lineNumber: 233,
                                    columnNumber: 15
                                }, this),
                                " por",
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-bold",
                                    children: [
                                        "$",
                                        viewPlan.precio,
                                        " dólares mensuales"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                                    lineNumber: 234,
                                    columnNumber: 15
                                }, this),
                                "."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                            lineNumber: 231,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                        lineNumber: 230,
                        columnNumber: 11
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 mb-4 border border-red-400 rounded-lg bg-red-400/10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                    className: "w-5 h-5 mt-0.5 mr-2 text-red-400"
                                }, void 0, false, {
                                    fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                                    lineNumber: 245,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-medium text-red-400",
                                            children: error
                                        }, void 0, false, {
                                            fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                                            lineNumber: 247,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: handleRetry,
                                            className: "mt-2 text-sm font-medium text-indigo-400 hover:text-indigo-300",
                                            children: "Intentar nuevamente"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                                            lineNumber: 248,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                                    lineNumber: 246,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                            lineNumber: 244,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                        lineNumber: 243,
                        columnNumber: 11
                    }, this),
                    paymentProcessing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-6 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xl text-gray-300",
                                children: "Procesando tu pago..."
                            }, void 0, false, {
                                fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                                lineNumber: 261,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-400",
                                children: "Por favor, no cierres esta ventana."
                            }, void 0, false, {
                                fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                                lineNumber: 262,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                        lineNumber: 260,
                        columnNumber: 11
                    }, this),
                    !paymentProcessing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: "cardPaymentBrick_container",
                        ref: paymentContainerRef,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$cardPayment$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CardPayment$3e$__["CardPayment"], {
                            initialization: {
                                amount: viewPlan ? viewPlan.precio : 0
                            },
                            onSubmit: handleFormSubmit,
                            onError: (err)=>{
                                console.error("Error en el Brick de Pago:", err);
                                setError(err.message || "Hubo un error al procesar el pago. Intenta nuevamente.");
                            },
                            customization: {
                                visual: {
                                    style: {
                                        theme: "dark"
                                    }
                                },
                                paymentMethods: {
                                    types: {
                                        included: [
                                            "credit_card",
                                            "debit_card",
                                            "prepaid_card"
                                        ]
                                    },
                                    minInstallments: 1,
                                    maxInstallments: 12
                                }
                            }
                        }, "payment-form", false, {
                            fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                            lineNumber: 268,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                        lineNumber: 267,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(default)/suscribirse/layout.tsx",
                lineNumber: 215,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(default)/suscribirse/layout.tsx",
        lineNumber: 206,
        columnNumber: 5
    }, this);
};
_s(PaymentForm, "/NH5jrNFc/yGYUKf3etivjqgJKY=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = PaymentForm;
const __TURBOPACK__default__export__ = PaymentForm;
var _c;
__turbopack_refresh__.register(_c, "PaymentForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(default)/suscribirse/layout.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
"[project]/node_modules/@mercadopago/sdk-js/dist/index.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadMercadoPago = void 0;
const SDK_MERCADOPAGO_URL = 'https://sdk.mercadopago.com/js/v2';
const SDK_MERCADOPAGO_URL_REGEX = /^https:\/\/sdk\.mercadopago\.com\/js\/v2\/?(\?.*)?$/;
const EXISTING_SCRIPT_MESSAGE_INITIALIZED = 'MercadoPago has already been initialized in your window, please remove the duplicate import';
const EXISTING_SCRIPT_MESSAGE_NOT_AVAILABLE = 'MercadoPago.js not available';
const EXISTING_SCRIPT_MESSAGE_FAILED_TO_LOAD = 'Failed to load MercadoPago.js';
const findScript = ()=>{
    var scripts = document.querySelectorAll(`script[src^="${SDK_MERCADOPAGO_URL}"`);
    for(var i = 0; i < scripts.length; i++){
        var script = scripts[i];
        if (!SDK_MERCADOPAGO_URL_REGEX.test(script.src)) {
            continue;
        }
        return script;
    }
    return null;
};
const injectScript = ()=>{
    const script = document.createElement('script');
    script.src = SDK_MERCADOPAGO_URL;
    const headOrBody = document.head || document.body;
    if (!headOrBody) {
        throw new Error('Expected document.body or document.head not to be null. MercadoPago requires a <body> or a <head> element, please add on your project.');
    }
    headOrBody.appendChild(script);
    return script;
};
let LoadPromise = null;
const loadMercadoPago = ()=>{
    if (LoadPromise !== null) {
        return LoadPromise;
    }
    LoadPromise = new Promise((resolve, reject)=>{
        if (typeof window === 'undefined') {
            // Resolve to null when imported server side. This makes the module
            // safe to import in an isomorphic code base.
            resolve(null);
            return;
        }
        if (window.MercadoPago) {
            console.warn(EXISTING_SCRIPT_MESSAGE_INITIALIZED);
            resolve(window.MercadoPago);
            return;
        }
        try {
            let script = findScript();
            if (script) {
                console.warn(EXISTING_SCRIPT_MESSAGE_INITIALIZED);
            } else if (!script) {
                script = injectScript();
            }
            script.addEventListener('load', ()=>{
                if (window.MercadoPago) {
                    resolve(window.MercadoPago);
                } else {
                    reject(new Error(EXISTING_SCRIPT_MESSAGE_NOT_AVAILABLE));
                }
            });
            script.addEventListener('error', ()=>{
                reject(new Error(EXISTING_SCRIPT_MESSAGE_FAILED_TO_LOAD));
            });
        } catch (error) {
            reject(error);
            return;
        }
    });
    return LoadPromise;
};
exports.loadMercadoPago = loadMercadoPago;
}}),
"[project]/node_modules/@mercadopago/sdk-react/esm/mercadoPago/initMercadoPago/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "MercadoPagoInstance": (()=>MercadoPagoInstance),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$js$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-js/dist/index.js [app-client] (ecmascript)");
var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
class MercadoPagoInstance {
    static getInstance() {
        return __awaiter(this, void 0, void 0, function*() {
            if (this.publicKey) {
                if (!this.loadedInstanceMercadoPago) {
                    yield (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$js$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadMercadoPago"])();
                    this.loadedInstanceMercadoPago = true;
                }
                if (!this.instanceMercadoPago) {
                    this.instanceMercadoPago = new window.MercadoPago(this.publicKey, this.options);
                }
                return this.instanceMercadoPago;
            } else {
                console.error('Expected the PUBLIC_KEY to render the MercadoPago SDK React');
            }
        });
    }
}
MercadoPagoInstance.publicKey = null;
MercadoPagoInstance.options = {};
MercadoPagoInstance.instanceMercadoPago = undefined;
MercadoPagoInstance.loadedInstanceMercadoPago = false;
function isOptionsObjectUnchanged(oldOption, newOption) {
    const checkOptionObject = Object.keys(oldOption).length === Object.keys(newOption).length && Object.keys(oldOption).every((key)=>{
        return Object.prototype.hasOwnProperty.call(newOption, key) && oldOption[key] === newOption[key];
    });
    return checkOptionObject;
}
/**
 * Create an instance of MercadoPago
 * @param publicKey string
 * @param options TOptions
 */ const initMercadoPago = (publicKey, options)=>{
    const injectFrontEndOption = Object.assign(Object.assign({}, options), {
        frontEndStack: 'react'
    });
    const didOptionsChange = !isOptionsObjectUnchanged(MercadoPagoInstance.options, injectFrontEndOption);
    if (publicKey !== MercadoPagoInstance.publicKey || didOptionsChange) {
        MercadoPagoInstance.publicKey = publicKey;
        MercadoPagoInstance.options = injectFrontEndOption;
        MercadoPagoInstance.instanceMercadoPago = undefined;
    }
};
const __TURBOPACK__default__export__ = initMercadoPago;
}}),
"[project]/node_modules/@mercadopago/sdk-react/esm/bricks/util/constants/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// Bricks uses a debounce to prevent unnecessary reRenders.
__turbopack_esm__({
    "DEBOUNCE_TIME_RENDER": (()=>DEBOUNCE_TIME_RENDER)
});
const DEBOUNCE_TIME_RENDER = 200; //ms
}}),
"[project]/node_modules/@mercadopago/sdk-react/esm/bricks/util/initial/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "onBinChangeDefault": (()=>onBinChangeDefault),
    "onClickEditBillingDataDefault": (()=>onClickEditBillingDataDefault),
    "onClickEditShippingDataDefault": (()=>onClickEditShippingDataDefault),
    "onErrorDefault": (()=>onErrorDefault),
    "onReadyDefault": (()=>onReadyDefault),
    "onRenderNextStepDefault": (()=>onRenderNextStepDefault),
    "onRenderPreviousStepDefault": (()=>onRenderPreviousStepDefault),
    "onSubmitDefault": (()=>onSubmitDefault)
});
var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const onSubmitDefault = ()=>__awaiter(void 0, void 0, void 0, function*() {});
const onReadyDefault = ()=>{};
const onErrorDefault = (error)=>{
    console.error(error);
};
const onBinChangeDefault = (bin)=>{
    {
        console.log(bin);
    }
};
const onClickEditShippingDataDefault = ()=>{
    console.log('onClickEditShippingData default implementation');
};
const onClickEditBillingDataDefault = ()=>{
    console.log('onClickEditShippingData default implementation');
};
const onRenderNextStepDefault = (currentStep)=>{
    console.log(currentStep);
};
const onRenderPreviousStepDefault = (currentStep)=>{
    console.log(currentStep);
};
;
}}),
"[project]/node_modules/@mercadopago/sdk-react/esm/bricks/util/renderBrick/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "initBrick": (()=>initBrick)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$mercadoPago$2f$initMercadoPago$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/mercadoPago/initMercadoPago/index.js [app-client] (ecmascript)");
var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
const initBrick = ({ settings, name, containerId, controller })=>__awaiter(void 0, void 0, void 0, function*() {
        const instanceMercadoPago = yield __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$mercadoPago$2f$initMercadoPago$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MercadoPagoInstance"].getInstance();
        const bricksBuilder = instanceMercadoPago === null || instanceMercadoPago === void 0 ? void 0 : instanceMercadoPago.bricks();
        window[controller] = yield bricksBuilder === null || bricksBuilder === void 0 ? void 0 : bricksBuilder.create(name, containerId, settings);
    });
}}),
"[project]/node_modules/@mercadopago/sdk-react/esm/bricks/cardPayment/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "useCardPaymentBrick": (()=>useCardPaymentBrick)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$constants$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/bricks/util/constants/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$initial$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/bricks/util/initial/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$renderBrick$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/bricks/util/renderBrick/index.js [app-client] (ecmascript)");
;
;
;
;
/**
 * Card Payment Brick allows you to offer payments with credit and debit card at yout checkout.
 *
 * Usage:
 *
 * ```ts
 * import CardPayment, {initMercadoPago} from '@mercadopago/sdk-react'
 *
 * initMercadoPago('YOUR_PUBLIC_KEY')
 *
 * const Example = () => {
 *   return(
 *      <CardPayment
 *       initialization={{amount: AMOUNT}} // AMOUNT is the value from the purchase, its the minium data to initialize CardPayment brick
 *       onSubmit={} // Receives a function that send the payment to backend and, through it, to MercadoPago
 *       />
 *  )
 * }
 * export default Example
 * ```
 *
 * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/card-payment-brick/introduction Card Payment Brick documentation} for more information.
 */ const CardPayment = ({ onReady = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$initial$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onReadyDefault"], onError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$initial$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onErrorDefault"], onSubmit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$initial$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSubmitDefault"], onBinChange = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$initial$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onBinChangeDefault"], initialization, customization, locale, id = 'cardPaymentBrick_container' })=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CardPayment.useEffect": ()=>{
            // CardPayment uses a debounce to prevent unnecessary reRenders.
            const CardPaymentBrickConfig = {
                settings: {
                    initialization,
                    customization,
                    callbacks: {
                        onReady,
                        onSubmit,
                        onError,
                        onBinChange
                    },
                    locale
                },
                name: 'cardPayment',
                containerId: id,
                controller: 'cardPaymentBrickController'
            };
            const timer = setTimeout({
                "CardPayment.useEffect.timer": ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$renderBrick$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initBrick"])(CardPaymentBrickConfig);
                }
            }["CardPayment.useEffect.timer"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$constants$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBOUNCE_TIME_RENDER"]);
            return ({
                "CardPayment.useEffect": ()=>{
                    var _a;
                    clearTimeout(timer);
                    (_a = window.cardPaymentBrickController) === null || _a === void 0 ? void 0 : _a.unmount();
                }
            })["CardPayment.useEffect"];
        }
    }["CardPayment.useEffect"], [
        initialization,
        customization,
        onBinChange,
        onReady,
        onError,
        onSubmit
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        id: id
    });
};
const useCardPaymentBrick = ()=>{
    const update = (updateValues)=>{
        if (window.cardPaymentBrickController) {
            window.cardPaymentBrickController.update(updateValues);
        } else {
            console.warn('[Checkout Bricks] Card Payment Brick is not initialized yet, please try again after a few seconds.');
        }
    };
    return {
        update
    };
};
const __TURBOPACK__default__export__ = CardPayment;
;
}}),
"[project]/node_modules/@mercadopago/sdk-react/esm/bricks/payment/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__),
    "usePaymentBrick": (()=>usePaymentBrick)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$constants$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/bricks/util/constants/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$initial$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/bricks/util/initial/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$renderBrick$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/bricks/util/renderBrick/index.js [app-client] (ecmascript)");
;
;
;
;
/**
 * Payment Brick allows you to add several payment methods to a store and save card data for future purchases with just one Brick.
 *
 * Usage:
 *
 * ```ts
 * import Payment, {initMercadoPago} from '@mercadopago/sdk-react'
 *
 * initMercadoPago('YOUR_PUBLIC_KEY')
 *
 * const Example = () => {
 *   return(
 *    <Payment
        initialization:{{ amount: AMOUNT }}, // AMOUNT is the value from the purchase, its the minium data to initialize CardPayment brick
        onSubmit={async () => {}} // Callback called when clicking on the data submission button
      />
 *   )
 * }
 * export default Example
 * ```
 *
 * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/payment-brick/introduction Payment Brick documentation} for more information.
 */ const Payment = ({ onReady = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$initial$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onReadyDefault"], onError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$initial$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onErrorDefault"], onSubmit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$initial$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSubmitDefault"], onBinChange = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$initial$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onBinChangeDefault"], onClickEditShippingData = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$initial$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onClickEditShippingDataDefault"], onClickEditBillingData = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$initial$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onClickEditBillingDataDefault"], onRenderNextStep = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$initial$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onRenderNextStepDefault"], onRenderPreviousStep = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$initial$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onRenderPreviousStepDefault"], initialization, customization, locale, id = 'paymentBrick_container' })=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Payment.useEffect": ()=>{
            // Payment uses a debounce to prevent unnecessary reRenders.
            const PaymentBrickController = {
                settings: {
                    initialization,
                    customization,
                    locale,
                    callbacks: {
                        onReady,
                        onError,
                        onSubmit,
                        onBinChange,
                        onClickEditShippingData,
                        onClickEditBillingData,
                        onRenderNextStep,
                        onRenderPreviousStep
                    }
                },
                name: 'payment',
                containerId: id,
                controller: 'paymentBrickController'
            };
            const timer = setTimeout({
                "Payment.useEffect.timer": ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$renderBrick$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initBrick"])(PaymentBrickController);
                }
            }["Payment.useEffect.timer"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$constants$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBOUNCE_TIME_RENDER"]);
            return ({
                "Payment.useEffect": ()=>{
                    var _a;
                    clearTimeout(timer);
                    (_a = window.paymentBrickController) === null || _a === void 0 ? void 0 : _a.unmount();
                }
            })["Payment.useEffect"];
        }
    }["Payment.useEffect"], [
        initialization,
        customization,
        onReady,
        onError,
        onSubmit,
        onBinChange
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        id: id
    });
};
const usePaymentBrick = ()=>{
    const update = (updateValues)=>{
        if (window.paymentBrickController) {
            window.paymentBrickController.update(updateValues);
        } else {
            console.warn('[Checkout Bricks] Payment Brick is not initialized yet, please try again after a few seconds.');
        }
    };
    return {
        update
    };
};
const __TURBOPACK__default__export__ = Payment;
;
}}),
"[project]/node_modules/@mercadopago/sdk-react/esm/bricks/statusScreen/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$initial$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/bricks/util/initial/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$renderBrick$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/bricks/util/renderBrick/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$constants$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/bricks/util/constants/index.js [app-client] (ecmascript)");
;
;
;
;
// /**
//  * Status Screen Brick allows you to show buyer the status of a purchase made with any payment method provided by Checkout Bricks.
//  *
//  * Usage:
//  *
//  * ```ts
//  * import StatusScreen, {initMercadoPago} from '@mercadopago/sdk-react'
//  *
//  * initMercadoPago('YOUR_PUBLIC_KEY')
//  *
//  * const Example = () => {
//  *   return(
//  *     <StatusScreen
//  *       initialization={{ preferenceId: '<PREFERENCE_ID>'}} // PREFERENCE_ID generated in backend
//  *       onReady={() => {}} // Callback called when Brick is ready
//  *       onError={() => {}} // Callback called for all Brick error cases
//  *     />
//  *   )
//  * }
//  * export default Example
//  * ```
//  *
//  * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/status-screen-brick/introduction Status Screen Brick documentation} for more information.
//  */
const StatusScreen = ({ onReady = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$initial$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onReadyDefault"], onError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$initial$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onErrorDefault"], customization, initialization, locale, id = 'statusScreenBrick_container' })=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StatusScreen.useEffect": ()=>{
            // Status Screen uses a debounce to prevent unnecessary reRenders.
            const StatusScreenBrickConfig = {
                settings: {
                    initialization,
                    customization,
                    locale,
                    callbacks: {
                        onReady,
                        onError
                    }
                },
                name: 'statusScreen',
                containerId: id,
                controller: 'statusScreenBrickController'
            };
            const timer = setTimeout({
                "StatusScreen.useEffect.timer": ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$renderBrick$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initBrick"])(StatusScreenBrickConfig);
                }
            }["StatusScreen.useEffect.timer"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$constants$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBOUNCE_TIME_RENDER"]);
            return ({
                "StatusScreen.useEffect": ()=>{
                    var _a;
                    clearTimeout(timer);
                    (_a = window.statusScreenBrickController) === null || _a === void 0 ? void 0 : _a.unmount();
                }
            })["StatusScreen.useEffect"];
        }
    }["StatusScreen.useEffect"], [
        initialization,
        customization,
        onReady,
        onError
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        id: id
    });
};
const __TURBOPACK__default__export__ = StatusScreen;
}}),
"[project]/node_modules/@mercadopago/sdk-react/esm/bricks/wallet/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$initial$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/bricks/util/initial/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$renderBrick$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/bricks/util/renderBrick/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$constants$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/bricks/util/constants/index.js [app-client] (ecmascript)");
;
;
;
;
/**
 * Wallet Brick allows you to offer payments from your Mercado Pago account at any stage of the purchase process.
 *
 * Usage:
 *
 * ```ts
 * import Wallet, {initMercadoPago} from '@mercadopago/sdk-react'
 *
 * initMercadoPago('YOUR_PUBLIC_KEY')
 *
 * const Example = () => {
 *   return(
 *     <Wallet initialization={{ preferenceId: '<PREFERENCE_ID>'}} /> // PREFERENCE_ID generated in backend
 *   )
 * }
 * export default Example
 * ```
 *
 * @see {@link https://www.mercadopago.com/developers/en/docs/checkout-bricks/wallet-brick/introduction Wallet Brick documentation} for more information.
 */ const Wallet = ({ onReady = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$initial$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onReadyDefault"], onError = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$initial$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onErrorDefault"], onSubmit = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$initial$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onSubmitDefault"], customization, initialization, brand, locale, id = 'walletBrick_container' })=>{
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Wallet.useEffect": ()=>{
            // CardPayment uses a debounce to prevent unnecessary reRenders.
            const WalletBrickConfig = {
                settings: {
                    brand,
                    initialization,
                    customization,
                    locale,
                    callbacks: {
                        onReady: onReady,
                        onSubmit: onSubmit,
                        onError: onError
                    }
                },
                name: 'wallet',
                containerId: id,
                controller: 'walletBrickController'
            };
            const timer = setTimeout({
                "Wallet.useEffect.timer": ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$renderBrick$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initBrick"])(WalletBrickConfig);
                }
            }["Wallet.useEffect.timer"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$constants$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBOUNCE_TIME_RENDER"]);
            return ({
                "Wallet.useEffect": ()=>{
                    var _a;
                    clearTimeout(timer);
                    (_a = window.walletBrickController) === null || _a === void 0 ? void 0 : _a.unmount();
                }
            })["Wallet.useEffect"];
        }
    }["Wallet.useEffect"], [
        customization,
        initialization,
        onReady,
        onError,
        onSubmit
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        id: id
    });
};
const __TURBOPACK__default__export__ = Wallet;
}}),
"[project]/node_modules/@mercadopago/sdk-react/esm/coreMethods/getIdentificationTypes/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$mercadoPago$2f$initMercadoPago$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/mercadoPago/initMercadoPago/index.js [app-client] (ecmascript)");
var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
/**
 * Return all the document types based on the public_key
 *
 * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/core-methods.md#mp-instancegetidentificationtypes method documentation}.
 * @see {@link https://www.mercadopago.com/developers/en/reference/identification_types/_identification_types/get response documentation}.
 */ const getIdentificationTypes = ()=>__awaiter(void 0, void 0, void 0, function*() {
        const instanceMercadoPago = yield __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$mercadoPago$2f$initMercadoPago$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MercadoPagoInstance"].getInstance();
        return instanceMercadoPago === null || instanceMercadoPago === void 0 ? void 0 : instanceMercadoPago.getIdentificationTypes();
    });
const __TURBOPACK__default__export__ = getIdentificationTypes;
}}),
"[project]/node_modules/@mercadopago/sdk-react/esm/coreMethods/getPaymentMethods/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$mercadoPago$2f$initMercadoPago$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/mercadoPago/initMercadoPago/index.js [app-client] (ecmascript)");
var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
/**
 * Returns a payment methods list.
 *
 * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/core-methods.md#mp-instancegetpaymentmethodspaymentmethodsparams method documentation}.
 * @see {@link https://www.mercadopago.com/developers/en/reference/payment_methods/_payment_methods/get response documentation}.
 */ const getPaymentMethods = (paymentMethodsParams)=>__awaiter(void 0, void 0, void 0, function*() {
        const instanceMercadoPago = yield __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$mercadoPago$2f$initMercadoPago$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MercadoPagoInstance"].getInstance();
        return instanceMercadoPago === null || instanceMercadoPago === void 0 ? void 0 : instanceMercadoPago.getPaymentMethods(paymentMethodsParams);
    });
const __TURBOPACK__default__export__ = getPaymentMethods;
}}),
"[project]/node_modules/@mercadopago/sdk-react/esm/coreMethods/getInstallments/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$mercadoPago$2f$initMercadoPago$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/mercadoPago/initMercadoPago/index.js [app-client] (ecmascript)");
var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
/**
 * Returns all installments available.
 *
 * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/core-methods.md#mp-instancegetinstallmentsinstallmentsparams method documentation}.
 */ const getInstallments = (installmentsParams)=>__awaiter(void 0, void 0, void 0, function*() {
        const instanceMercadoPago = yield __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$mercadoPago$2f$initMercadoPago$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MercadoPagoInstance"].getInstance();
        return instanceMercadoPago === null || instanceMercadoPago === void 0 ? void 0 : instanceMercadoPago.getInstallments(installmentsParams);
    });
const __TURBOPACK__default__export__ = getInstallments;
}}),
"[project]/node_modules/@mercadopago/sdk-react/esm/coreMethods/getIssuers/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$mercadoPago$2f$initMercadoPago$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/mercadoPago/initMercadoPago/index.js [app-client] (ecmascript)");
var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
/**
 * Returns a issuers list.
 *
 * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/core-methods.md#mp-instancegetissuersissuersparams method documentation}.
 */ const getIssuers = (issuersParams)=>__awaiter(void 0, void 0, void 0, function*() {
        const instanceMercadoPago = yield __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$mercadoPago$2f$initMercadoPago$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MercadoPagoInstance"].getInstance();
        return instanceMercadoPago === null || instanceMercadoPago === void 0 ? void 0 : instanceMercadoPago.getIssuers(issuersParams);
    });
const __TURBOPACK__default__export__ = getIssuers;
}}),
"[project]/node_modules/@mercadopago/sdk-react/esm/secureFields/createCardToken/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$mercadoPago$2f$initMercadoPago$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/mercadoPago/initMercadoPago/index.js [app-client] (ecmascript)");
var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
/**
 * Secure Fields token creation method.
 *
 * @see {@link https://github.com/mercadopago/sdk-js/blob/main/docs/fields.md#mp-instancefieldscreatecardtokennonpcidata method documentation}.
 */ const createCardToken = (cardTokenParams)=>__awaiter(void 0, void 0, void 0, function*() {
        const instanceMercadoPago = yield __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$mercadoPago$2f$initMercadoPago$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MercadoPagoInstance"].getInstance();
        return instanceMercadoPago === null || instanceMercadoPago === void 0 ? void 0 : instanceMercadoPago.fields.createCardToken(cardTokenParams);
    });
const __TURBOPACK__default__export__ = createCardToken;
}}),
"[project]/node_modules/@mercadopago/sdk-react/esm/secureFields/updateCardToken/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$mercadoPago$2f$initMercadoPago$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/mercadoPago/initMercadoPago/index.js [app-client] (ecmascript)");
var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
/** Secure Fields token update method. */ const updateCardToken = (token)=>__awaiter(void 0, void 0, void 0, function*() {
        const instanceMercadoPago = yield __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$mercadoPago$2f$initMercadoPago$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MercadoPagoInstance"].getInstance();
        return instanceMercadoPago === null || instanceMercadoPago === void 0 ? void 0 : instanceMercadoPago.fields.updateCardToken(token);
    });
const __TURBOPACK__default__export__ = updateCardToken;
}}),
"[project]/node_modules/@mercadopago/sdk-react/esm/secureFields/util/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "getInitializationDependencies": (()=>getInitializationDependencies),
    "initSecureField": (()=>initSecureField)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$mercadoPago$2f$initMercadoPago$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/mercadoPago/initMercadoPago/index.js [app-client] (ecmascript)");
var __awaiter = this && this.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
        });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
const getInitializationDependencies = (params, keysToExclude)=>{
    const dependencies = [];
    const entries = Object.entries(params);
    for (const [key, value] of entries){
        const shouldAdd = !keysToExclude.includes(key);
        shouldAdd && dependencies.push(value);
    }
    return dependencies;
};
const getOptions = ({ enableLuhnValidation, customFonts, placeholder, group, style, mode })=>{
    return {
        enableLuhnValidation,
        customFonts,
        placeholder,
        group,
        style,
        mode
    };
};
const secureFieldEvents = [
    'onValidityChange',
    'onBinChange',
    'onChange',
    'onError',
    'onFocus',
    'onReady',
    'onBlur'
];
const uncapitalizeFirstLetter = (str)=>str.charAt(0).toLowerCase() + str.slice(1);
const formatEventName = (eventName)=>uncapitalizeFirstLetter(eventName.slice(2));
const registerEvents = (secureFieldInstance, params)=>{
    const keys = Object.keys(params);
    for (const key of keys){
        if (secureFieldEvents.includes(key)) {
            const event = formatEventName(key);
            const callback = params[key];
            secureFieldInstance.on(event, callback);
        }
    }
};
const initSecureField = (fieldName, params)=>__awaiter(void 0, void 0, void 0, function*() {
        const options = getOptions(params);
        const instanceMercadoPago = yield __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$mercadoPago$2f$initMercadoPago$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MercadoPagoInstance"].getInstance();
        const secureFieldInstance = instanceMercadoPago === null || instanceMercadoPago === void 0 ? void 0 : instanceMercadoPago.fields.create(fieldName, options);
        if (secureFieldInstance) {
            secureFieldInstance.mount(`${fieldName}SecureField_container`);
            registerEvents(secureFieldInstance, params);
        }
        return secureFieldInstance;
    });
}}),
"[project]/node_modules/@mercadopago/sdk-react/esm/secureFields/cardNumber/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$secureFields$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/secureFields/util/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$constants$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/bricks/util/constants/index.js [app-client] (ecmascript)");
;
;
;
const CardNumber = (params)=>{
    const initializationDependencies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$secureFields$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitializationDependencies"])(params, [
        'placeholder',
        'length'
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CardNumber.useEffect": ()=>{
            // SecureField uses a debounce to prevent unnecessary reRenders.
            let timer;
            timer = setTimeout({
                "CardNumber.useEffect": ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$secureFields$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initSecureField"])('cardNumber', params).then({
                        "CardNumber.useEffect": (instance)=>window.cardNumberInstance = instance
                    }["CardNumber.useEffect"]);
                }
            }["CardNumber.useEffect"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$constants$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBOUNCE_TIME_RENDER"]);
            return ({
                "CardNumber.useEffect": ()=>{
                    var _a;
                    clearTimeout(timer);
                    (_a = window.cardNumberInstance) === null || _a === void 0 ? void 0 : _a.unmount();
                    window.cardNumberInstance = undefined;
                }
            })["CardNumber.useEffect"];
        }
    }["CardNumber.useEffect"], initializationDependencies);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        id: "cardNumberSecureField_container"
    });
};
const __TURBOPACK__default__export__ = CardNumber;
}}),
"[project]/node_modules/@mercadopago/sdk-react/esm/secureFields/securityCode/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$secureFields$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/secureFields/util/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$constants$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/bricks/util/constants/index.js [app-client] (ecmascript)");
;
;
;
const SecurityCode = (params)=>{
    const initializationDependencies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$secureFields$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitializationDependencies"])(params, [
        'placeholder',
        'length',
        'mode'
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SecurityCode.useEffect": ()=>{
            // SecureField uses a debounce to prevent unnecessary reRenders.
            let timer;
            timer = setTimeout({
                "SecurityCode.useEffect": ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$secureFields$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initSecureField"])('securityCode', params).then({
                        "SecurityCode.useEffect": (instance)=>window.securityCodeInstance = instance
                    }["SecurityCode.useEffect"]);
                }
            }["SecurityCode.useEffect"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$constants$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBOUNCE_TIME_RENDER"]);
            return ({
                "SecurityCode.useEffect": ()=>{
                    var _a;
                    clearTimeout(timer);
                    (_a = window.securityCodeInstance) === null || _a === void 0 ? void 0 : _a.unmount();
                    window.securityCodeInstance = undefined;
                }
            })["SecurityCode.useEffect"];
        }
    }["SecurityCode.useEffect"], initializationDependencies);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        id: "securityCodeSecureField_container"
    });
};
const __TURBOPACK__default__export__ = SecurityCode;
}}),
"[project]/node_modules/@mercadopago/sdk-react/esm/secureFields/expirationDate/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$secureFields$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/secureFields/util/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$constants$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/bricks/util/constants/index.js [app-client] (ecmascript)");
;
;
;
const ExpirationDate = (params)=>{
    const initializationDependencies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$secureFields$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitializationDependencies"])(params, [
        'placeholder'
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ExpirationDate.useEffect": ()=>{
            // SecureField uses a debounce to prevent unnecessary reRenders.
            let timer;
            timer = setTimeout({
                "ExpirationDate.useEffect": ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$secureFields$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initSecureField"])('expirationDate', params).then({
                        "ExpirationDate.useEffect": (instance)=>window.expirationDateInstance = instance
                    }["ExpirationDate.useEffect"]);
                }
            }["ExpirationDate.useEffect"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$constants$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBOUNCE_TIME_RENDER"]);
            return ({
                "ExpirationDate.useEffect": ()=>{
                    var _a;
                    clearTimeout(timer);
                    (_a = window.expirationDateInstance) === null || _a === void 0 ? void 0 : _a.unmount();
                    window.expirationDateInstance = undefined;
                }
            })["ExpirationDate.useEffect"];
        }
    }["ExpirationDate.useEffect"], initializationDependencies);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        id: "expirationDateSecureField_container"
    });
};
const __TURBOPACK__default__export__ = ExpirationDate;
}}),
"[project]/node_modules/@mercadopago/sdk-react/esm/secureFields/expirationMonth/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$secureFields$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/secureFields/util/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$constants$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/bricks/util/constants/index.js [app-client] (ecmascript)");
;
;
;
const ExpirationMonth = (params)=>{
    const initializationDependencies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$secureFields$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitializationDependencies"])(params, [
        'placeholder'
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ExpirationMonth.useEffect": ()=>{
            // SecureField uses a debounce to prevent unnecessary reRenders.
            let timer;
            timer = setTimeout({
                "ExpirationMonth.useEffect": ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$secureFields$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initSecureField"])('expirationMonth', params).then({
                        "ExpirationMonth.useEffect": (instance)=>window.expirationMonthInstance = instance
                    }["ExpirationMonth.useEffect"]);
                }
            }["ExpirationMonth.useEffect"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$constants$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBOUNCE_TIME_RENDER"]);
            return ({
                "ExpirationMonth.useEffect": ()=>{
                    var _a;
                    clearTimeout(timer);
                    (_a = window.expirationMonthInstance) === null || _a === void 0 ? void 0 : _a.unmount();
                    window.expirationMonthInstance = undefined;
                }
            })["ExpirationMonth.useEffect"];
        }
    }["ExpirationMonth.useEffect"], initializationDependencies);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        id: "expirationMonthSecureField_container"
    });
};
const __TURBOPACK__default__export__ = ExpirationMonth;
}}),
"[project]/node_modules/@mercadopago/sdk-react/esm/secureFields/expirationYear/index.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$secureFields$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/secureFields/util/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$constants$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/bricks/util/constants/index.js [app-client] (ecmascript)");
;
;
;
const ExpirationYear = (params)=>{
    const initializationDependencies = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$secureFields$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getInitializationDependencies"])(params, [
        'placeholder'
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ExpirationYear.useEffect": ()=>{
            // SecureField uses a debounce to prevent unnecessary reRenders.
            let timer;
            timer = setTimeout({
                "ExpirationYear.useEffect": ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$secureFields$2f$util$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initSecureField"])('expirationYear', params).then({
                        "ExpirationYear.useEffect": (instance)=>window.expirationYearInstance = instance
                    }["ExpirationYear.useEffect"]);
                }
            }["ExpirationYear.useEffect"], __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$util$2f$constants$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEBOUNCE_TIME_RENDER"]);
            return ({
                "ExpirationYear.useEffect": ()=>{
                    var _a;
                    clearTimeout(timer);
                    (_a = window.expirationYearInstance) === null || _a === void 0 ? void 0 : _a.unmount();
                    window.expirationYearInstance = undefined;
                }
            })["ExpirationYear.useEffect"];
        }
    }["ExpirationYear.useEffect"], initializationDependencies);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement("div", {
        id: "expirationYearSecureField_container"
    });
};
const __TURBOPACK__default__export__ = ExpirationYear;
}}),
"[project]/node_modules/@mercadopago/sdk-react/esm/index.js [app-client] (ecmascript) <locals>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({});
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}}),
"[project]/node_modules/@mercadopago/sdk-react/esm/index.js [app-client] (ecmascript) <module evaluation>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$mercadoPago$2f$initMercadoPago$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/mercadoPago/initMercadoPago/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$cardPayment$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/bricks/cardPayment/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$payment$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/bricks/payment/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$statusScreen$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/bricks/statusScreen/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$wallet$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/bricks/wallet/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$coreMethods$2f$getIdentificationTypes$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/coreMethods/getIdentificationTypes/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$coreMethods$2f$getPaymentMethods$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/coreMethods/getPaymentMethods/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$coreMethods$2f$getInstallments$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/coreMethods/getInstallments/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$coreMethods$2f$getIssuers$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/coreMethods/getIssuers/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$secureFields$2f$createCardToken$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/secureFields/createCardToken/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$secureFields$2f$updateCardToken$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/secureFields/updateCardToken/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$secureFields$2f$cardNumber$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/secureFields/cardNumber/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$secureFields$2f$securityCode$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/secureFields/securityCode/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$secureFields$2f$expirationDate$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/secureFields/expirationDate/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$secureFields$2f$expirationMonth$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/secureFields/expirationMonth/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$secureFields$2f$expirationYear$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/secureFields/expirationYear/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/index.js [app-client] (ecmascript) <locals>");
}}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
module.exports = __turbopack_require__("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_esm__({
    "__iconNode": (()=>__iconNode),
    "default": (()=>ChevronLeft)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m15 18-6-6 6-6",
            key: "1wnfg3"
        }
    ]
];
const ChevronLeft = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("ChevronLeft", __iconNode);
;
 //# sourceMappingURL=chevron-left.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ChevronLeft": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript)");
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_esm__({
    "__iconNode": (()=>__iconNode),
    "default": (()=>CircleAlert)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "circle",
        {
            cx: "12",
            cy: "12",
            r: "10",
            key: "1mglay"
        }
    ],
    [
        "line",
        {
            x1: "12",
            x2: "12",
            y1: "8",
            y2: "12",
            key: "1pkeuh"
        }
    ],
    [
        "line",
        {
            x1: "12",
            x2: "12.01",
            y1: "16",
            y2: "16",
            key: "4dfq90"
        }
    ]
];
const CircleAlert = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("CircleAlert", __iconNode);
;
 //# sourceMappingURL=circle-alert.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript) <export default as AlertCircle>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({
    "AlertCircle": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-client] (ecmascript)");
}}),
"[project]/node_modules/@mercadopago/sdk-react/esm/bricks/cardPayment/index.js [app-client] (ecmascript) <export default as CardPayment>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({
    "CardPayment": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$cardPayment$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mercadopago$2f$sdk$2d$react$2f$esm$2f$bricks$2f$cardPayment$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@mercadopago/sdk-react/esm/bricks/cardPayment/index.js [app-client] (ecmascript)");
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, z: __turbopack_require_stub__ } = __turbopack_context__;
{
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_esm__({
    "__iconNode": (()=>__iconNode),
    "default": (()=>RefreshCw)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",
            key: "v9h5vc"
        }
    ],
    [
        "path",
        {
            d: "M21 3v5h-5",
            key: "1q7to0"
        }
    ],
    [
        "path",
        {
            d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",
            key: "3uifl3"
        }
    ],
    [
        "path",
        {
            d: "M8 16H3v5",
            key: "1cv678"
        }
    ]
];
const RefreshCw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("RefreshCw", __iconNode);
;
 //# sourceMappingURL=refresh-cw.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
__turbopack_esm__({
    "RefreshCw": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_9defdc._.js.map