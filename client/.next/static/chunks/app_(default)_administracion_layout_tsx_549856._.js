(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_(default)_administracion_layout_tsx_549856._.js", {

"[project]/app/(default)/administracion/layout.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$Administracion$2e$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/context/Administracion.context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$Suscribe$2e$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/context/Suscribe.context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
const AdminPanel = ()=>{
    _s();
    const { getUsers } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$context$2f$Administracion$2e$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminContext"]);
    const { planes } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$context$2f$Suscribe$2e$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SuscribeContext"]);
    const [allUsers, setAllUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [selectedPlans, setSelectedPlans] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedUser, setSelectedUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [modalOpen, setModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Cargar usuarios al montar el componente
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminPanel.useEffect": ()=>{
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
        }
    }["AdminPanel.useEffect"], [
        getUsers
    ]);
    // Filtrar usuarios según el término de búsqueda y planes seleccionados
    const filteredUsers = allUsers.filter((user)=>{
        const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()) || user.id.toLowerCase().includes(searchTerm.toLowerCase());
        let matchesPlan = true;
        if (selectedPlans.length > 0) {
            if (user.subscripcion && user.subscripcion.plan && selectedPlans.includes(user.subscripcion.plan.id)) {
                matchesPlan = true;
            } else {
                matchesPlan = false;
            }
        }
        return matchesSearch && matchesPlan;
    });
    // Función para alternar la selección de un plan
    const togglePlanSelection = (planId)=>{
        if (selectedPlans.includes(planId)) {
            setSelectedPlans((prev)=>prev.filter((id)=>id !== planId));
        } else {
            setSelectedPlans((prev)=>[
                    ...prev,
                    planId
                ]);
        }
    };
    const openModal = (user)=>{
        setSelectedUser(user);
        setModalOpen(true);
    };
    const closeModal = ()=>{
        setSelectedUser(null);
        setModalOpen(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "px-4 py-3 mx-auto max-w-7xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "mb-4 text-3xl font-bold",
                children: "Panel de Administración"
            }, void 0, false, {
                fileName: "[project]/app/(default)/administracion/layout.tsx",
                lineNumber: 85,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4 mb-6 md:flex-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "Buscar por username, email o ID...",
                        value: searchTerm,
                        onChange: (e)=>setSearchTerm(e.target.value),
                        className: "flex-1 px-4 py-2 text-white bg-gray-700 rounded-lg"
                    }, void 0, false, {
                        fileName: "[project]/app/(default)/administracion/layout.tsx",
                        lineNumber: 89,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-4",
                        children: planes.map((plan)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>togglePlanSelection(plan.id),
                                className: `px-4 py-2 rounded-lg text-white cursor-pointer transition-colors ${selectedPlans.includes(plan.id) ? "bg-indigo-600" : "bg-gray-700"}`,
                                children: plan.name
                            }, plan.id, false, {
                                fileName: "[project]/app/(default)/administracion/layout.tsx",
                                lineNumber: 99,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/(default)/administracion/layout.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/(default)/administracion/layout.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3",
                children: filteredUsers.length > 0 ? filteredUsers.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        onClick: ()=>openModal(user),
                        className: "p-4 transition-colors bg-gray-700 rounded-lg shadow cursor-pointer hover:bg-gray-600",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-bold text-white",
                                children: user.username
                            }, void 0, false, {
                                fileName: "[project]/app/(default)/administracion/layout.tsx",
                                lineNumber: 124,
                                columnNumber: 15
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
                        lineNumber: 119,
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
                lineNumber: 116,
                columnNumber: 7
            }, this),
            modalOpen && selectedUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "w-11/12 p-6 bg-gray-800 rounded-lg shadow-lg md:w-1/2 lg:w-1/3",
                    style: {
                        transform: "scaleX(1.2) scaleY(1.1)",
                        transformOrigin: "center"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "mb-4 text-2xl font-bold text-white",
                            children: "Detalles del Usuario"
                        }, void 0, false, {
                            fileName: "[project]/app/(default)/administracion/layout.tsx",
                            lineNumber: 146,
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
                                            lineNumber: 154,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: typeof value === "object" ? JSON.stringify(value) : value
                                        }, void 0, false, {
                                            fileName: "[project]/app/(default)/administracion/layout.tsx",
                                            lineNumber: 155,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, key, true, {
                                    fileName: "[project]/app/(default)/administracion/layout.tsx",
                                    lineNumber: 153,
                                    columnNumber: 19
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/(default)/administracion/layout.tsx",
                            lineNumber: 149,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: closeModal,
                            className: "px-4 py-2 mt-4 text-white transition-all rounded bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700",
                            children: "Cerrar"
                        }, void 0, false, {
                            fileName: "[project]/app/(default)/administracion/layout.tsx",
                            lineNumber: 163,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(default)/administracion/layout.tsx",
                    lineNumber: 139,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(default)/administracion/layout.tsx",
                lineNumber: 138,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(default)/administracion/layout.tsx",
        lineNumber: 84,
        columnNumber: 5
    }, this);
};
_s(AdminPanel, "581Pccd1FYdcn4VAC7hDHcAs6Ig=");
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