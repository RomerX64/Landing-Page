(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_(default)_administracion_layout_tsx_549856._.js", {

"[project]/app/(default)/administracion/layout.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$Administracion$2e$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/context/Administracion.context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$Suscribe$2e$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/context/Suscribe.context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$interfaces$2f$Subscripcion$2e$interface$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/interfaces/Subscripcion.interface.ts [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
const AdminPanel = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { planes } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$context$2f$Suscribe$2e$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SuscribeContext"]);
    const { getUsers, putAdmin, getAllPlans, deletePlan, getAllSubscriptions, updateSubscriptionStatus, cancelSubscription } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$context$2f$Administracion$2e$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminContext"]);
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("usuarios");
    const [allUsers, setAllUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [allPlans, setAllPlans] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [allSubscriptions, setAllSubscriptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedPlans, setSelectedPlans] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedUser, setSelectedUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [modalOpen, setModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const filteredUsers = allUsers.filter((user)=>{
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()) || user.id.toLowerCase().includes(searchTerm.toLowerCase());
        let matchesPlan = true;
        if (selectedPlans.length > 0) {
            matchesPlan = user.subscripcion?.plan ? selectedPlans.includes(user.subscripcion.plan.id) : false;
        }
        return matchesSearch && matchesPlan;
    });
    const togglePlanSelection = (planId)=>{
        setSelectedPlans((prev)=>prev.includes(planId) ? prev.filter((id)=>id !== planId) : [
                ...prev,
                planId
            ]);
    };
    const openModal = (user)=>{
        setSelectedUser(user);
        setModalOpen(true);
    };
    const closeModal = ()=>{
        setSelectedUser(null);
        setModalOpen(false);
    };
    const redirectToEdit = (userId)=>{
        router.push(`/administracion/${userId}`);
    };
    const renderUsuariosTab = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-4 mb-6 md:flex-row",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            placeholder: "Buscar por nombre, email o ID...",
                            value: searchTerm,
                            onChange: (e)=>setSearchTerm(e.target.value),
                            className: "flex-1 px-4 py-2 text-white bg-gray-700 rounded-lg"
                        }, void 0, false, {
                            fileName: "[project]/app/(default)/administracion/layout.tsx",
                            lineNumber: 88,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-4",
                            children: planes.map((plan)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>togglePlanSelection(plan.id),
                                    className: `px-4 py-2 rounded-lg text-white transition-colors ${selectedPlans.includes(plan.id) ? "bg-indigo-600" : "bg-gray-700"}`,
                                    children: plan.name
                                }, plan.id, false, {
                                    fileName: "[project]/app/(default)/administracion/layout.tsx",
                                    lineNumber: 97,
                                    columnNumber: 13
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/(default)/administracion/layout.tsx",
                            lineNumber: 95,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(default)/administracion/layout.tsx",
                    lineNumber: 87,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
                    children: filteredUsers.length > 0 ? filteredUsers.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            onClick: ()=>openModal(user),
                            className: "relative p-4 transition-colors bg-gray-700 rounded-lg shadow cursor-pointer hover:bg-gray-600",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg font-bold text-white",
                                    children: user.name
                                }, void 0, false, {
                                    fileName: "[project]/app/(default)/administracion/layout.tsx",
                                    lineNumber: 119,
                                    columnNumber: 15
                                }, this),
                                user.isAdmin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "absolute flex items-center justify-center w-4 h-4 text-xs font-bold rounded-full top-2 right-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-400 text-neutral-950",
                                    children: "A"
                                }, void 0, false, {
                                    fileName: "[project]/app/(default)/administracion/layout.tsx",
                                    lineNumber: 121,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-300",
                                    children: user.email
                                }, void 0, false, {
                                    fileName: "[project]/app/(default)/administracion/layout.tsx",
                                    lineNumber: 125,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-400",
                                    children: [
                                        "ID: ",
                                        user.id
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(default)/administracion/layout.tsx",
                                    lineNumber: 126,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, user.id, true, {
                            fileName: "[project]/app/(default)/administracion/layout.tsx",
                            lineNumber: 114,
                            columnNumber: 13
                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center text-gray-300 col-span-full",
                        children: "No se encontraron usuarios."
                    }, void 0, false, {
                        fileName: "[project]/app/(default)/administracion/layout.tsx",
                        lineNumber: 130,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(default)/administracion/layout.tsx",
                    lineNumber: 111,
                    columnNumber: 7
                }, this),
                modalOpen && selectedUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-11/12 p-6 bg-gray-800 rounded-lg shadow-lg md:w-1/2 lg:w-1/3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mb-4 text-2xl font-bold text-white",
                                children: "Detalles del Usuario"
                            }, void 0, false, {
                                fileName: "[project]/app/(default)/administracion/layout.tsx",
                                lineNumber: 139,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2 text-gray-300",
                                children: Object.entries(selectedUser).filter(([key])=>key !== "password" && key !== "isAdmin").map(([key, value])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "mr-2 font-bold",
                                                children: [
                                                    key,
                                                    ":"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/(default)/administracion/layout.tsx",
                                                lineNumber: 147,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: typeof value === "object" ? JSON.stringify(value) : String(value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/(default)/administracion/layout.tsx",
                                                lineNumber: 148,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, key, true, {
                                        fileName: "[project]/app/(default)/administracion/layout.tsx",
                                        lineNumber: 146,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/app/(default)/administracion/layout.tsx",
                                lineNumber: 142,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-end mt-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: closeModal,
                                        className: "px-4 py-2 text-white transition-all rounded bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700",
                                        children: "Cerrar"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(default)/administracion/layout.tsx",
                                        lineNumber: 157,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>redirectToEdit(selectedUser.id),
                                        className: "px-4 py-2 ml-2 text-white transition-all rounded bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700",
                                        children: "Modificar"
                                    }, void 0, false, {
                                        fileName: "[project]/app/(default)/administracion/layout.tsx",
                                        lineNumber: 163,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/(default)/administracion/layout.tsx",
                                lineNumber: 156,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(default)/administracion/layout.tsx",
                        lineNumber: 138,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(default)/administracion/layout.tsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(default)/administracion/layout.tsx",
            lineNumber: 85,
            columnNumber: 5
        }, this);
    // Render para la pestaña de Planes
    const renderPlanesTab = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "mb-4 text-2xl font-bold text-white",
                    children: "Planes"
                }, void 0, false, {
                    fileName: "[project]/app/(default)/administracion/layout.tsx",
                    lineNumber: 179,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
                    children: allPlans.length > 0 ? allPlans.map((plan)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 bg-gray-700 rounded-lg shadow",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg font-bold text-white",
                                    children: plan.name
                                }, void 0, false, {
                                    fileName: "[project]/app/(default)/administracion/layout.tsx",
                                    lineNumber: 184,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-300",
                                    children: plan.descripcion
                                }, void 0, false, {
                                    fileName: "[project]/app/(default)/administracion/layout.tsx",
                                    lineNumber: 185,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-300",
                                    children: [
                                        "Precio: $",
                                        plan.precio
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(default)/administracion/layout.tsx",
                                    lineNumber: 186,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between mt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>router.push(`/administracion/plan/${plan.id}`),
                                            className: "px-3 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700",
                                            children: "Editar"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(default)/administracion/layout.tsx",
                                            lineNumber: 188,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: async ()=>{
                                                try {
                                                    await deletePlan(plan.id);
                                                    setAllPlans((prev)=>prev.filter((p)=>p.id !== plan.id));
                                                } catch (error) {
                                                    console.error("Error al eliminar el plan:", error);
                                                }
                                            },
                                            className: "px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700",
                                            children: "Eliminar"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(default)/administracion/layout.tsx",
                                            lineNumber: 194,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(default)/administracion/layout.tsx",
                                    lineNumber: 187,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, plan.id, true, {
                            fileName: "[project]/app/(default)/administracion/layout.tsx",
                            lineNumber: 183,
                            columnNumber: 13
                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center text-gray-300 col-span-full",
                        children: "No se encontraron planes."
                    }, void 0, false, {
                        fileName: "[project]/app/(default)/administracion/layout.tsx",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(default)/administracion/layout.tsx",
                    lineNumber: 180,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>router.push("/administracion/plan/nuevo"),
                    className: "px-4 py-2 mt-4 text-white bg-green-600 rounded hover:bg-green-700",
                    children: "Agregar Nuevo Plan"
                }, void 0, false, {
                    fileName: "[project]/app/(default)/administracion/layout.tsx",
                    lineNumber: 218,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(default)/administracion/layout.tsx",
            lineNumber: 178,
            columnNumber: 5
        }, this);
    const renderSuscripcionesTab = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "mb-4 text-2xl font-bold text-white",
                    children: "Suscripciones"
                }, void 0, false, {
                    fileName: "[project]/app/(default)/administracion/layout.tsx",
                    lineNumber: 228,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 gap-4",
                    children: allSubscriptions.length > 0 ? allSubscriptions.map((sub)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 bg-gray-700 rounded-lg shadow",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-lg font-bold text-white",
                                    children: [
                                        "ID: ",
                                        sub.id
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(default)/administracion/layout.tsx",
                                    lineNumber: 233,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-300",
                                    children: [
                                        "Usuario: ",
                                        sub.user.email,
                                        " - ",
                                        sub.user.name
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(default)/administracion/layout.tsx",
                                    lineNumber: 234,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-300",
                                    children: [
                                        "Plan: ",
                                        sub.plan.name
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(default)/administracion/layout.tsx",
                                    lineNumber: 237,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-300",
                                    children: [
                                        "Estado: ",
                                        sub.status
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(default)/administracion/layout.tsx",
                                    lineNumber: 238,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-2 mt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: async ()=>{
                                                try {
                                                    await updateSubscriptionStatus(sub.id, __TURBOPACK__imported__module__$5b$project$5d2f$interfaces$2f$Subscripcion$2e$interface$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SubscriptionStatus"].PAUSED);
                                                    const newSubs = await getAllSubscriptions();
                                                    // Aseguramos que los datos tengan el formato correcto antes de actualizar el estado
                                                    const formattedSubs = newSubs.map((subscription)=>({
                                                            ...subscription,
                                                            user: {
                                                                id: subscription.id,
                                                                name: "Usuario",
                                                                email: "email@example.com"
                                                            }
                                                        }));
                                                    setAllSubscriptions(formattedSubs);
                                                } catch (error) {
                                                    console.error("Error al actualizar la suscripción:", error);
                                                }
                                            },
                                            className: "px-3 py-1 text-sm text-white bg-yellow-600 rounded hover:bg-yellow-700",
                                            children: "Pausar"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(default)/administracion/layout.tsx",
                                            lineNumber: 240,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: async ()=>{
                                                try {
                                                    await cancelSubscription(sub.id, "Cancelado por admin");
                                                    const newSubs = await getAllSubscriptions();
                                                    // Mismo formato que arriba
                                                    const formattedSubs = newSubs.map((subscription)=>({
                                                            ...subscription,
                                                            user: {
                                                                id: subscription.id,
                                                                name: "Usuario",
                                                                email: "email@example.com"
                                                            }
                                                        }));
                                                    setAllSubscriptions(formattedSubs);
                                                } catch (error) {
                                                    console.error("Error al cancelar la suscripción:", error);
                                                }
                                            },
                                            className: "px-3 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700",
                                            children: "Cancelar"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(default)/administracion/layout.tsx",
                                            lineNumber: 269,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(default)/administracion/layout.tsx",
                                    lineNumber: 239,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, sub.id, true, {
                            fileName: "[project]/app/(default)/administracion/layout.tsx",
                            lineNumber: 232,
                            columnNumber: 13
                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center text-gray-300",
                        children: "No se encontraron suscripciones."
                    }, void 0, false, {
                        fileName: "[project]/app/(default)/administracion/layout.tsx",
                        lineNumber: 296,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(default)/administracion/layout.tsx",
                    lineNumber: 229,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(default)/administracion/layout.tsx",
            lineNumber: 227,
            columnNumber: 5
        }, this);
    // Actualiza el useEffect para manejar correctamente los tipos
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminPanel.useEffect": ()=>{
            if (activeTab === "usuarios") {
                const fetchUsers = {
                    "AdminPanel.useEffect.fetchUsers": async ()=>{
                        try {
                            const users = await getUsers();
                            setAllUsers(users);
                        } catch (error) {
                            console.error("Error fetching users:", error);
                        }
                    }
                }["AdminPanel.useEffect.fetchUsers"];
                fetchUsers();
            } else if (activeTab === "planes") {
                const fetchPlans = {
                    "AdminPanel.useEffect.fetchPlans": async ()=>{
                        try {
                            const plans = await getAllPlans();
                            setAllPlans(plans);
                        } catch (error) {
                            console.error("Error fetching plans:", error);
                        }
                    }
                }["AdminPanel.useEffect.fetchPlans"];
                fetchPlans();
            } else if (activeTab === "suscripciones") {
                const fetchSubscriptions = {
                    "AdminPanel.useEffect.fetchSubscriptions": async ()=>{
                        try {
                            const subs = await getAllSubscriptions();
                            // Formateamos las suscripciones para que coincidan con SubscriptionType
                            const formattedSubs = subs.map({
                                "AdminPanel.useEffect.fetchSubscriptions.formattedSubs": (subscription)=>({
                                        ...subscription,
                                        user: {
                                            id: subscription.id,
                                            name: "Usuario",
                                            email: "email@example.com"
                                        }
                                    })
                            }["AdminPanel.useEffect.fetchSubscriptions.formattedSubs"]);
                            setAllSubscriptions(formattedSubs);
                        } catch (error) {
                            console.error("Error fetching subscriptions:", error);
                        }
                    }
                }["AdminPanel.useEffect.fetchSubscriptions"];
                fetchSubscriptions();
            }
        }
    }["AdminPanel.useEffect"], [
        activeTab,
        getUsers,
        getAllPlans,
        getAllSubscriptions
    ]);
    // El resto del componente permanece igual...
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "px-4 py-3 mx-auto max-w-7xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "mb-4 text-3xl font-bold text-white",
                children: "Panel de Administración"
            }, void 0, false, {
                fileName: "[project]/app/(default)/administracion/layout.tsx",
                lineNumber: 352,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-4 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab("usuarios"),
                        className: `px-4 py-2 rounded ${activeTab === "usuarios" ? "bg-indigo-600" : "bg-gray-700 text-white"}`,
                        children: "Usuarios"
                    }, void 0, false, {
                        fileName: "[project]/app/(default)/administracion/layout.tsx",
                        lineNumber: 356,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab("planes"),
                        className: `px-4 py-2 rounded ${activeTab === "planes" ? "bg-indigo-600" : "bg-gray-700 text-white"}`,
                        children: "Planes"
                    }, void 0, false, {
                        fileName: "[project]/app/(default)/administracion/layout.tsx",
                        lineNumber: 366,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab("suscripciones"),
                        className: `px-4 py-2 rounded ${activeTab === "suscripciones" ? "bg-indigo-600" : "bg-gray-700 text-white"}`,
                        children: "Suscripciones"
                    }, void 0, false, {
                        fileName: "[project]/app/(default)/administracion/layout.tsx",
                        lineNumber: 374,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(default)/administracion/layout.tsx",
                lineNumber: 355,
                columnNumber: 7
            }, this),
            activeTab === "usuarios" && renderUsuariosTab(),
            activeTab === "planes" && renderPlanesTab(),
            activeTab === "suscripciones" && renderSuscripcionesTab()
        ]
    }, void 0, true, {
        fileName: "[project]/app/(default)/administracion/layout.tsx",
        lineNumber: 351,
        columnNumber: 5
    }, this);
};
_s(AdminPanel, "/o0NFnq2mz9ueSJYNvSgU4Bn2Fo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AdminPanel;
const __TURBOPACK__default__export__ = AdminPanel;
var _c;
__turbopack_refresh__.register(_c, "AdminPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(default)/administracion/layout.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=app_%28default%29_administracion_layout_tsx_549856._.js.map