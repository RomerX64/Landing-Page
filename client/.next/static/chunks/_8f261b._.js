(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_8f261b._.js", {

"[project]/app/(default)/profile/layout.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
<<<<<<< HEAD
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$user$2e$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/context/user.context.tsx [app-client] (ecmascript)");
=======
var __TURBOPACK__imported__module__$5b$project$5d2f$context$2f$user$2e$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/context/user.context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
const UserProfile = ()=>{
    _s();
<<<<<<< HEAD
    const { user, updateUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$context$2f$user$2e$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserContext"]);
=======
    const { user, updateUser, signOut } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(__TURBOPACK__imported__module__$5b$project$5d2f$context$2f$user$2e$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UserContext"]);
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [formData, setFormData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        email: "",
        company: "",
        password: "",
        telefono: "",
        username: ""
    });
<<<<<<< HEAD
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserProfile.useEffect": ()=>{
            if (!user) {
                router.push("/signIn");
=======
    const [isEditing, setIsEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false); // Controla si los campos están en modo de edición
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "UserProfile.useEffect": ()=>{
            if (!user) {
                router?.push("/signin");
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
            } else {
                setFormData({
                    username: user.username || "",
                    email: user.email || "",
                    telefono: user.telefono || "",
                    company: user.company || "",
                    password: ""
                });
            }
        }
    }["UserProfile.useEffect"], [
        user,
        router
    ]);
    if (!user) return null;
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        await updateUser({
            ...formData,
            id: user.id
        });
<<<<<<< HEAD
=======
        setIsEditing(false); // Deshabilitar el modo de edición al guardar los cambios
    };
    const handleSignOut = ()=>{
        signOut();
    };
    const toggleEditMode = ()=>{
        setIsEditing(!isEditing); // Cambiar entre editar y vista solo lectura
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "px-2 py-3 mx-auto max-w-7xl",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative w-[75vw] mx-auto overflow-hidden bg-gray-800 shadow-2xl sm:px-6 rounded-2xl flex flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative flex flex-wrap items-center justify-between gap-3 px-4 py-6 md:flex-row",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                    size: 48,
                                    className: "text-indigo-200/65 "
                                }, void 0, false, {
                                    fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                                    lineNumber: 49,
=======
                                    lineNumber: 59,
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400",
                                            children: user.username
                                        }, void 0, false, {
                                            fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                                            lineNumber: 51,
=======
                                            lineNumber: 61,
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-indigo-200/65",
                                            children: user.id
                                        }, void 0, false, {
                                            fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                                            lineNumber: 54,
=======
                                            lineNumber: 64,
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                                    lineNumber: 50,
=======
                                    lineNumber: 60,
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                            lineNumber: 48,
=======
                            lineNumber: 58,
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "w-full text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 md:text-right md:w-auto",
                            children: user.company
                        }, void 0, false, {
                            fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                            lineNumber: 57,
=======
                            lineNumber: 67,
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
=======
                    lineNumber: 57,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex justify-between p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: toggleEditMode,
                            className: "px-6 py-3 font-semibold text-white transition-all duration-300 rounded-lg shadow-md bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800",
                            children: isEditing ? "Cancelar Edición" : "Editar Perfil"
                        }, void 0, false, {
                            fileName: "[project]/app/(default)/profile/layout.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSignOut,
                            className: "px-6 py-3 font-semibold text-white transition-all duration-300 rounded-lg shadow-md bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800",
                            children: "Deslogearse"
                        }, void 0, false, {
                            fileName: "[project]/app/(default)/profile/layout.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(default)/profile/layout.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                    onSubmit: handleSubmit,
                    className: "p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 gap-6 md:grid-cols-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-gray-300",
                                            children: "Nombre"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                                            lineNumber: 66,
                                            columnNumber: 15
=======
                                            lineNumber: 93,
                                            columnNumber: 17
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            name: "username",
                                            value: formData.username,
                                            onChange: handleChange,
                                            className: "w-full px-3 py-2 mt-1 text-white bg-gray-700 rounded-lg"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                                            lineNumber: 67,
                                            columnNumber: 15
=======
                                            lineNumber: 94,
                                            columnNumber: 17
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                                    lineNumber: 65,
                                    columnNumber: 13
=======
                                    lineNumber: 92,
                                    columnNumber: 15
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-gray-300",
                                            children: "Email"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                                            lineNumber: 76,
                                            columnNumber: 15
=======
                                            lineNumber: 103,
                                            columnNumber: 17
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "email",
                                            name: "email",
                                            value: formData.email,
                                            onChange: handleChange,
                                            className: "w-full px-3 py-2 mt-1 text-white bg-gray-700 rounded-lg"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                                            lineNumber: 77,
                                            columnNumber: 15
=======
                                            lineNumber: 104,
                                            columnNumber: 17
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                                    lineNumber: 75,
                                    columnNumber: 13
=======
                                    lineNumber: 102,
                                    columnNumber: 15
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-gray-300",
                                            children: "Teléfono"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                                            lineNumber: 86,
                                            columnNumber: 15
=======
                                            lineNumber: 113,
                                            columnNumber: 17
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            name: "telefono",
                                            value: formData.telefono,
                                            onChange: handleChange,
                                            className: "w-full px-3 py-2 mt-1 text-white bg-gray-700 rounded-lg"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                                            lineNumber: 87,
                                            columnNumber: 15
=======
                                            lineNumber: 114,
                                            columnNumber: 17
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                                    lineNumber: 85,
                                    columnNumber: 13
=======
                                    lineNumber: 112,
                                    columnNumber: 15
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-gray-300",
                                            children: "Empresa"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                                            lineNumber: 96,
                                            columnNumber: 15
=======
                                            lineNumber: 123,
                                            columnNumber: 17
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            name: "company",
                                            value: formData.company,
                                            onChange: handleChange,
                                            className: "w-full px-3 py-2 mt-1 text-white bg-gray-700 rounded-lg"
                                        }, void 0, false, {
                                            fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                                            lineNumber: 97,
                                            columnNumber: 15
=======
                                            lineNumber: 124,
                                            columnNumber: 17
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                                    lineNumber: 95,
                                    columnNumber: 13
=======
                                    lineNumber: 122,
                                    columnNumber: 15
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                            lineNumber: 64,
                            columnNumber: 11
=======
                            lineNumber: 91,
                            columnNumber: 13
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "block text-gray-300",
                                    children: "Contraseña (dejar en blanco para no cambiar)"
                                }, void 0, false, {
                                    fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                                    lineNumber: 107,
                                    columnNumber: 13
=======
                                    lineNumber: 134,
                                    columnNumber: 15
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "password",
                                    name: "password",
                                    value: formData.password,
                                    onChange: handleChange,
                                    className: "w-full px-3 py-2 mt-1 text-white bg-gray-700 rounded-lg",
                                    placeholder: "********"
                                }, void 0, false, {
                                    fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                                    lineNumber: 110,
                                    columnNumber: 13
=======
                                    lineNumber: 137,
                                    columnNumber: 15
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                            lineNumber: 106,
                            columnNumber: 11
=======
                            lineNumber: 133,
                            columnNumber: 13
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-end mt-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "px-6 py-3 font-semibold text-white transition-all duration-300 rounded-lg shadow-md bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700",
                                children: "Guardar Cambios"
                            }, void 0, false, {
                                fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                                lineNumber: 120,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(default)/profile/layout.tsx",
                            lineNumber: 119,
                            columnNumber: 11
=======
                                lineNumber: 147,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/(default)/profile/layout.tsx",
                            lineNumber: 146,
                            columnNumber: 13
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
                    lineNumber: 63,
                    columnNumber: 9
=======
                    lineNumber: 90,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 gap-6 md:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "block text-gray-300",
                                    children: [
                                        "Nombre: ",
                                        formData.username
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(default)/profile/layout.tsx",
                                    lineNumber: 159,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(default)/profile/layout.tsx",
                                lineNumber: 158,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "block text-gray-300",
                                    children: [
                                        "Email: ",
                                        formData.email
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(default)/profile/layout.tsx",
                                    lineNumber: 164,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(default)/profile/layout.tsx",
                                lineNumber: 163,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "block text-gray-300",
                                    children: [
                                        "Teléfono: ",
                                        formData.telefono
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(default)/profile/layout.tsx",
                                    lineNumber: 167,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(default)/profile/layout.tsx",
                                lineNumber: 166,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "block text-gray-300",
                                    children: [
                                        "Empresa: ",
                                        formData.company
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/(default)/profile/layout.tsx",
                                    lineNumber: 172,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/(default)/profile/layout.tsx",
                                lineNumber: 171,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/(default)/profile/layout.tsx",
                        lineNumber: 157,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/(default)/profile/layout.tsx",
                    lineNumber: 156,
                    columnNumber: 11
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
            lineNumber: 45,
=======
            lineNumber: 55,
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/(default)/profile/layout.tsx",
<<<<<<< HEAD
        lineNumber: 44,
        columnNumber: 5
    }, this);
};
_s(UserProfile, "cTClqbEqO5t7EgioKu+TamV7No8=", false, function() {
=======
        lineNumber: 54,
        columnNumber: 5
    }, this);
};
_s(UserProfile, "waEwIvCTLHA+MJ/G+n6JJdcGbRo=", false, function() {
>>>>>>> c1d71ea21458e829175dbf5afe57cdf0232685be
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = UserProfile;
const __TURBOPACK__default__export__ = UserProfile;
var _c;
__turbopack_refresh__.register(_c, "UserProfile");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/(default)/profile/layout.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
"[project]/node_modules/next/navigation.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
module.exports = __turbopack_require__("[project]/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_8f261b._.js.map