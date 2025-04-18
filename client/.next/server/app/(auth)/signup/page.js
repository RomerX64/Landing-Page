(()=>{var e={};e.id=271,e.ids=[271],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},12412:e=>{"use strict";e.exports=require("assert")},94735:e=>{"use strict";e.exports=require("events")},29021:e=>{"use strict";e.exports=require("fs")},81630:e=>{"use strict";e.exports=require("http")},55591:e=>{"use strict";e.exports=require("https")},33873:e=>{"use strict";e.exports=require("path")},27910:e=>{"use strict";e.exports=require("stream")},79551:e=>{"use strict";e.exports=require("url")},28354:e=>{"use strict";e.exports=require("util")},74075:e=>{"use strict";e.exports=require("zlib")},21774:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>o.a,__next_app__:()=>m,pages:()=>c,routeModule:()=>u,tree:()=>d});var s=r(70260),a=r(28203),i=r(25155),o=r.n(i),n=r(67292),l={};for(let e in n)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);r.d(t,l);let d=["",{children:["(auth)",{children:["signup",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,2705)),"C:\\Users\\tomir\\OneDrive\\Desktop\\AssetlyLandingPage\\client\\app\\(auth)\\signup\\page.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,61149)),"C:\\Users\\tomir\\OneDrive\\Desktop\\AssetlyLandingPage\\client\\app\\(auth)\\signup\\layout.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,17509)),"C:\\Users\\tomir\\OneDrive\\Desktop\\AssetlyLandingPage\\client\\app\\(auth)\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,19937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,41485,23)),"next/dist/client/components/unauthorized-error"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,19611)),"C:\\Users\\tomir\\OneDrive\\Desktop\\AssetlyLandingPage\\client\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,19937,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,69116,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,41485,23)),"next/dist/client/components/unauthorized-error"]}],c=["C:\\Users\\tomir\\OneDrive\\Desktop\\AssetlyLandingPage\\client\\app\\(auth)\\signup\\page.tsx"],m={require:r,loadChunk:()=>Promise.resolve()},u=new s.AppPageRouteModule({definition:{kind:a.RouteKind.APP_PAGE,page:"/(auth)/signup/page",pathname:"/signup",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},96899:(e,t,r)=>{Promise.resolve().then(r.bind(r,61149))},10971:(e,t,r)=>{Promise.resolve().then(r.bind(r,7974))},13786:(e,t,r)=>{Promise.resolve().then(r.bind(r,61149))},53954:(e,t,r)=>{Promise.resolve().then(r.bind(r,7974))},35836:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,71066,23)),Promise.resolve().then(r.bind(r,98388)),Promise.resolve().then(r.bind(r,24888)),Promise.resolve().then(r.bind(r,22e3))},45564:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,41902,23)),Promise.resolve().then(r.bind(r,16948)),Promise.resolve().then(r.bind(r,25560)),Promise.resolve().then(r.bind(r,31728))},7974:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>J});var s,a=r(45512),i=r(58009),o=r(79334),n=r(28531),l=r.n(n),d=r(70919);let c=(0,r(94825).A)("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);var m=r(26753),u=r(45174),p=r(82446),x=r(25637),h=r(77144);let g={data:""},f=e=>"object"==typeof window?((e?e.querySelector("#_goober"):window._goober)||Object.assign((e||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:e||g,b=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,y=/\/\*[^]*?\*\/|  +/g,v=/\n+/g,j=(e,t)=>{let r="",s="",a="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":s+="f"==i[1]?j(o,i):i+"{"+j(o,"k"==i[1]?"":t)+"}":"object"==typeof o?s+=j(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),a+=j.p?j.p(i,o):i+":"+o+";")}return r+(t&&a?t+"{"+a+"}":a)+s},w={},N=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+N(e[r]);return t}return e},P=(e,t,r,s,a)=>{let i=N(e),o=w[i]||(w[i]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(i));if(!w[o]){let t=i!==e?e:(e=>{let t,r,s=[{}];for(;t=b.exec(e.replace(y,""));)t[4]?s.shift():t[3]?(r=t[3].replace(v," ").trim(),s.unshift(s[0][r]=s[0][r]||{})):s[0][t[1]]=t[2].replace(v," ").trim();return s[0]})(e);w[o]=j(a?{["@keyframes "+o]:t}:t,r?"":"."+o)}let n=r&&w.g?w.g:null;return r&&(w.g=w[o]),((e,t,r,s)=>{s?t.data=t.data.replace(s,e):-1===t.data.indexOf(e)&&(t.data=r?e+t.data:t.data+e)})(w[o],t,s,n),o},k=(e,t,r)=>e.reduce((e,s,a)=>{let i=t[a];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":j(e,""):!1===e?"":e}return e+s+(null==i?"":i)},"");function E(e){let t=this||{},r=e.call?e(t.p):e;return P(r.unshift?r.raw?k(r,[].slice.call(arguments,1),t.p):r.reduce((e,r)=>Object.assign(e,r&&r.call?r(t.p):r),{}):r,f(t.target),t.g,t.o,t.k)}E.bind({g:1});let A,C,_,q=E.bind({k:1});function $(e,t){let r=this||{};return function(){let s=arguments;function a(i,o){let n=Object.assign({},i),l=n.className||a.className;r.p=Object.assign({theme:C&&C()},n),r.o=/ *go\d+/.test(l),n.className=E.apply(r,s)+(l?" "+l:""),t&&(n.ref=o);let d=e;return e[0]&&(d=n.as||e,delete n.as),_&&d[0]&&_(n),A(d,n)}return t?t(a):a}}var z=e=>"function"==typeof e,S=(e,t)=>z(e)?e(t):e,D=(()=>{let e=0;return()=>(++e).toString()})(),M=((()=>{let e;return()=>e})(),(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:r}=t;return M(e,{type:e.toasts.find(e=>e.id===r.id)?1:0,toast:r});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let a=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+a}))}}}),L=[],O={toasts:[],pausedAt:void 0},R=e=>{O=M(O,e),L.forEach(e=>{e(O)})},I={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},F=(e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||D()}),H=e=>(t,r)=>{let s=F(t,e,r);return R({type:2,toast:s}),s.id},U=(e,t)=>H("blank")(e,t);U.error=H("error"),U.success=H("success"),U.loading=H("loading"),U.custom=H("custom"),U.dismiss=e=>{R({type:3,toastId:e})},U.remove=e=>R({type:4,toastId:e}),U.promise=(e,t,r)=>{let s=U.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let a=t.success?S(t.success,e):void 0;return a?U.success(a,{id:s,...r,...null==r?void 0:r.success}):U.dismiss(s),e}).catch(e=>{let a=t.error?S(t.error,e):void 0;a?U.error(a,{id:s,...r,...null==r?void 0:r.error}):U.dismiss(s)}),e};var W=new Map,G=1e3,B=q`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,T=q`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,V=q`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Z=($("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${B} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${T} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${V} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,q`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`),K=($("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${Z} 1s linear infinite;
`,q`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`),X=q`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Y=($("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${K} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${X} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,$("div")`
  position: absolute;
`,$("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,q`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`);function J(){let e;let{signUp:t,mailIsValid:r,signUpWithGoogle:s,user:n,isLoading:u}=(0,i.useContext)(d.Rs);(0,o.useRouter)();let[p,x]=(0,i.useState)({username:"",company:"",email:"",telefono:"",password:"",confirmPassword:""}),[h,g]=(0,i.useState)({username:"",company:"",phoneError:!1,passwordError:!1,lengthError:!1,emailError:"",complexityError:!1}),[f,b]=(0,i.useState)(!1),[y,v]=(0,i.useState)(!1),[j,w]=(0,i.useState)(!1),[N,P]=(0,i.useState)(!1),[k,E]=(0,i.useState)(!1),[A,C]=(0,i.useState)(1),_=(0,i.useCallback)(e=>{let t=/[a-z]/.test(e);return[t,/[A-Z]/.test(e),/\d/.test(e),/[!@#$%^&*(),.?":{}|<>]/.test(e)].filter(Boolean).length>=3},[]),q=e=>{let{name:t,value:r}=e.target;k||E(!0),x(e=>({...e,[t]:r})),g(e=>({...e,[t]:""})),"telefono"===t&&$(r)},$=e=>{if(!e){g(e=>({...e,phoneError:!1}));return}let t=e.replace(/\s+/g,"");t.startsWith("+")||(t="+"+t);let r=/^\+(?:[0-9] ?){6,14}[0-9]$/;g(e=>({...e,phoneError:!r.test(t)}))},z=e=>{let{name:t,value:r}=e.target;k||E(!0),x(e=>({...e,[t]:r}));let s="password"===t,a=s?r:p.password,i=s?p.confirmPassword:r,o=a.length<8,n=a!==i&&""!==i,l=!_(a);g(e=>({...e,passwordError:n,lengthError:o,complexityError:l}))},S=async t=>{let s=t.target.value;if(k||E(!0),x(e=>({...e,email:s})),g(e=>({...e,emailError:""})),!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)){g(e=>({...e,emailError:s?"Formato de correo inv\xe1lido":""}));return}clearTimeout(e),e=setTimeout(async()=>{try{let e=await r(s);g(t=>({...t,emailError:e?"Este correo ya est\xe1 registrado":""}))}catch(e){console.error("Error checking email:",e)}},500)},D=()=>{let e=""!==p.username.trim()&&""!==p.company.trim()&&""!==p.email.trim()&&!h.emailError&&""!==p.telefono.trim()&&!h.phoneError,t=p.password.length>=8&&!h.complexityError&&p.password===p.confirmPassword;return 1===A?e:t},M=()=>{let e={...h};if(""===p.username.trim()&&(e.username="El nombre de usuario es requerido"),""===p.company.trim()&&(e.company="El nombre de la compa\xf1\xeda es requerido"),""===p.email.trim()?e.emailError="El correo electr\xf3nico es requerido":/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)||(e.emailError="Formato de correo inv\xe1lido"),$(p.telefono),p.password){let t=p.password.length<8,r=p.password!==p.confirmPassword&&""!==p.confirmPassword,s=!_(p.password);e.lengthError=t,e.passwordError=r,e.complexityError=s}g(e)},L=async e=>{if(e.preventDefault(),!D()){M(),U.error("Por favor complete todos los campos correctamente");return}try{b(!0),await t(p)?(v(!0),U.success("Registro exitoso! Verifique su correo electr\xf3nico.")):U.error("Hubo un problema al crear su cuenta. Int\xe9ntelo de nuevo.")}catch(e){console.error("Error en la solicitud:",e),U.error("Error al registrar usuario. Int\xe9ntelo m\xe1s tarde.")}finally{b(!1)}},O=async()=>{try{b(!0),await s()}catch(e){console.error("Error al registrarse con Google",e),U.error("Error al registrarse con Google")}finally{b(!1)}};return y?(0,a.jsx)("section",{children:(0,a.jsx)("div",{className:"max-w-6xl px-4 mx-auto sm:px-6",children:(0,a.jsxs)("div",{className:"py-12 md:py-20",children:[(0,a.jsx)("div",{className:"pb-12 text-center",children:(0,a.jsx)("h1",{className:"animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl",children:"\xa1Registro Exitoso!"})}),(0,a.jsxs)("div",{className:"flex flex-col items-center justify-center mx-auto max-w-[500px] text-center",children:[(0,a.jsx)("div",{className:"flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-indigo-500/20",children:(0,a.jsx)(c,{className:"w-10 h-10 text-indigo-500"})}),(0,a.jsx)("h2",{className:"mb-4 text-xl font-semibold text-indigo-200",children:"Verifica tu correo electr\xf3nico"}),(0,a.jsxs)("p",{className:"mb-6 text-indigo-200/65",children:["Hemos enviado un correo de verificaci\xf3n a"," ",(0,a.jsx)("strong",{className:"text-indigo-400",children:p.email}),". Por favor, revisa tu bandeja de entrada y haz clic en el enlace de verificaci\xf3n para activar tu cuenta."]}),(0,a.jsx)("p",{className:"mb-10 text-sm text-indigo-200/65",children:"Si no encuentras el correo, verifica tu carpeta de spam o solicita un nuevo correo de verificaci\xf3n."}),(0,a.jsxs)("div",{className:"flex gap-4",children:[(0,a.jsx)("button",{onClick:()=>v(!1),className:"text-indigo-300 btn bg-indigo-500/20 hover:bg-indigo-500/30",children:"Volver al registro"}),(0,a.jsx)(l(),{href:"/signin",className:"btn bg-gradient-to-t from-indigo-600 to-indigo-500 text-white hover:bg-[length:100%_150%]",children:"Ir a Iniciar Sesi\xf3n"})]})]})]})})}):(0,a.jsx)("section",{children:(0,a.jsx)("div",{className:"max-w-6xl px-4 mx-auto sm:px-6",children:(0,a.jsxs)("div",{className:"py-12 md:py-20",children:[(0,a.jsxs)("div",{className:"pb-8 text-center",children:[(0,a.jsx)("h1",{className:"animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,theme(colors.gray.200),theme(colors.indigo.200),theme(colors.gray.50),theme(colors.indigo.300),theme(colors.gray.200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl",children:"Crea tu usuario"}),(0,a.jsx)("p",{className:"mt-2 text-indigo-200/65",children:1===A?"Informaci\xf3n b\xe1sica de la cuenta":"Establece tu contrase\xf1a"}),(0,a.jsxs)("div",{className:"flex items-center justify-center gap-2 mt-6",children:[(0,a.jsx)("div",{className:`w-3 h-3 rounded-full ${1===A?"bg-indigo-500":"bg-indigo-200"}`}),(0,a.jsx)("div",{className:`w-3 h-3 rounded-full ${2===A?"bg-indigo-500":"bg-indigo-200"}`})]})]}),(0,a.jsxs)("div",{className:"w-full max-w-md mx-auto",children:[1===A?(0,a.jsxs)("form",{onSubmit:e=>{e.preventDefault(),D()?C(2):(M(),U.error("Por favor complete todos los campos correctamente"))},className:"space-y-5",children:[(0,a.jsx)(Q,{id:"username",label:"Username",value:p.username,onChange:q,error:h.username,required:!0,icon:(0,a.jsx)("span",{className:"text-indigo-300/50",children:"@"})}),(0,a.jsx)(Q,{id:"company",label:"Nombre de Compa\xf1\xeda",value:p.company,onChange:q,error:h.company,required:!0}),(0,a.jsx)(Q,{id:"email",label:"Work Email",value:p.email,onChange:S,error:h.emailError,required:!0,type:"email",icon:(0,a.jsx)(c,{className:"w-4 h-4 text-indigo-300/50"})}),(0,a.jsx)(Q,{id:"telefono",label:"N\xfamero Telef\xf3nico",value:p.telefono,onChange:q,error:h.phoneError?"Formato inv\xe1lido. Ej: +54 9 11 1234-5678":"",required:!0,placeholder:"+54 9 11 1234-5678"}),(0,a.jsxs)("div",{className:"flex justify-between gap-4 mt-8",children:[(0,a.jsxs)("button",{type:"button",onClick:O,disabled:f||u,className:"flex items-center justify-center w-full text-gray-300 transition-all duration-200 btn bg-gradient-to-b from-gray-800 to-gray-800/60 disabled:opacity-50 disabled:cursor-not-allowed",children:[f||u?(0,a.jsx)(m.A,{className:"w-5 h-5 mr-2 animate-spin"}):(0,a.jsxs)("svg",{className:"w-5 h-5 mr-2",viewBox:"0 0 24 24",fill:"currentColor",children:[(0,a.jsx)("path",{d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"}),(0,a.jsx)("path",{d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"}),(0,a.jsx)("path",{d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"}),(0,a.jsx)("path",{d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"})]}),"Registrarse con Google"]}),(0,a.jsx)("button",{type:"submit",className:"w-full btn bg-gradient-to-t from-indigo-600 to-indigo-500 text-white hover:bg-[length:100%_150%]",disabled:f||u,children:f||u?(0,a.jsx)(m.A,{className:"animate-spin"}):"Continuar"})]})]}):(0,a.jsxs)("form",{onSubmit:L,className:"space-y-5",children:[(0,a.jsxs)("div",{className:"space-y-5",children:[(0,a.jsx)(ee,{password:p.password,showPassword:j,toggleShowPassword:()=>w(!j),onChange:z,lengthError:h.lengthError,complexityError:h.complexityError}),(0,a.jsx)(et,{confirmPassword:p.confirmPassword,showPassword:N,toggleShowPassword:()=>P(!N),onChange:z,passwordError:h.passwordError}),(0,a.jsxs)("div",{className:"p-4 mt-2 rounded-lg bg-indigo-900/30",children:[(0,a.jsx)("h4",{className:"mb-2 text-sm font-medium text-indigo-200",children:"Requisitos de contrase\xf1a:"}),(0,a.jsxs)("ul",{className:"space-y-1 text-xs text-indigo-200/65",children:[(0,a.jsx)(er,{met:p.password.length>=8,text:"M\xednimo 8 caracteres"}),(0,a.jsx)(er,{met:/[A-Z]/.test(p.password),text:"Al menos una letra may\xfascula"}),(0,a.jsx)(er,{met:/[a-z]/.test(p.password),text:"Al menos una letra min\xfascula"}),(0,a.jsx)(er,{met:/\d/.test(p.password),text:"Al menos un n\xfamero"}),(0,a.jsx)(er,{met:/[!@#$%^&*(),.?":{}|<>]/.test(p.password),text:"Al menos un caracter especial (!@#$%...)"}),(0,a.jsx)("li",{className:"mt-1 text-indigo-300",children:(0,a.jsx)("small",{children:"Se requieren al menos 3 de 5 criterios"})})]})]})]}),(0,a.jsxs)("div",{className:"flex items-center gap-4 mt-8",children:[(0,a.jsx)("button",{type:"button",onClick:()=>{C(1)},className:"flex-1 text-indigo-300 btn bg-indigo-500/20 hover:bg-indigo-500/30",disabled:f||u,children:"Atr\xe1s"}),(0,a.jsx)("button",{type:"submit",className:"flex-1 btn bg-gradient-to-t from-indigo-600 to-indigo-500 text-white hover:bg-[length:100%_150%]",disabled:f||u||h.passwordError||h.lengthError||h.complexityError,children:f||u?(0,a.jsx)(m.A,{className:"animate-spin"}):"Completar Registro"})]})]}),(0,a.jsxs)("div",{className:"mt-6 text-sm text-center text-indigo-200/65",children:["\xbfYa posee una cuenta?"," ",(0,a.jsx)(l(),{className:"font-medium text-indigo-500",href:"/signin",children:"Iniciar sesi\xf3n"})]})]})]})})})}$("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Y} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,$("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,$("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,s=i.createElement,j.p=void 0,A=s,C=void 0,_=void 0,E`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`;let Q=({id:e,label:t,value:r,onChange:s,error:i,required:o,type:n="text",placeholder:l,icon:d})=>(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{htmlFor:e,className:"block mb-1 text-sm font-medium text-indigo-200/65",children:[t," ",o&&(0,a.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,a.jsxs)("div",{className:"relative",children:[d&&(0,a.jsx)("div",{className:"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",children:d}),(0,a.jsx)("input",{id:e,name:e,type:n,className:`w-full form-input ${d?"pl-10":""} ${i?"border-red-500 focus:ring-red-500":"focus:ring-indigo-500"}`,placeholder:l||`Ingrese su ${t}`,value:r,onChange:s,required:o})]}),i&&(0,a.jsx)(es,{children:i})]}),ee=({password:e,showPassword:t,toggleShowPassword:r,onChange:s,lengthError:i,complexityError:o})=>(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{htmlFor:"password",className:"block mb-1 text-sm font-medium text-indigo-200/65",children:["Contrase\xf1a ",(0,a.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsx)("input",{id:"password",name:"password",type:t?"text":"password",className:`w-full pr-10 form-input ${i||o?"border-red-500 focus:ring-red-500":"focus:ring-indigo-500"}`,placeholder:"Establezca una contrase\xf1a segura",value:e,onChange:s,required:!0}),(0,a.jsx)("button",{type:"button",className:"absolute inset-y-0 right-0 flex items-center px-3 text-indigo-300",onClick:r,children:t?(0,a.jsx)(u.A,{className:"w-4 h-4"}):(0,a.jsx)(p.A,{className:"w-4 h-4"})})]}),i&&(0,a.jsx)(es,{children:"La contrase\xf1a debe tener al menos 8 caracteres"}),o&&!i&&(0,a.jsx)(es,{children:"La contrase\xf1a no cumple con los requisitos m\xednimos de seguridad"})]}),et=({confirmPassword:e,showPassword:t,toggleShowPassword:r,onChange:s,passwordError:i})=>(0,a.jsxs)("div",{children:[(0,a.jsxs)("label",{htmlFor:"confirmPassword",className:"block mb-1 text-sm font-medium text-indigo-200/65",children:["Confirmar contrase\xf1a ",(0,a.jsx)("span",{className:"text-red-500",children:"*"})]}),(0,a.jsxs)("div",{className:"relative",children:[(0,a.jsx)("input",{id:"confirmPassword",name:"confirmPassword",type:t?"text":"password",className:`w-full pr-10 form-input ${i?"border-red-500 focus:ring-red-500":"focus:ring-indigo-500"}`,placeholder:"Repita la contrase\xf1a",value:e,onChange:s,required:!0}),(0,a.jsx)("button",{type:"button",className:"absolute inset-y-0 right-0 flex items-center px-3 text-indigo-300",onClick:r,children:t?(0,a.jsx)(u.A,{className:"w-4 h-4"}):(0,a.jsx)(p.A,{className:"w-4 h-4"})})]}),i&&(0,a.jsx)(es,{children:"Las contrase\xf1as no coinciden"})]}),er=({met:e,text:t})=>(0,a.jsxs)("li",{className:"flex items-center gap-2",children:[e?(0,a.jsx)(x.A,{className:"w-3 h-3 text-green-500"}):(0,a.jsx)(h.A,{className:"w-3 h-3 text-amber-500"}),(0,a.jsx)("span",{className:e?"text-indigo-200":"text-indigo-200/50",children:t})]}),es=({children:e})=>(0,a.jsx)("span",{className:"mt-1 text-xs text-red-500",children:e})},79334:(e,t,r)=>{"use strict";var s=r(58686);r.o(s,"useParams")&&r.d(t,{useParams:function(){return s.useParams}}),r.o(s,"useRouter")&&r.d(t,{useRouter:function(){return s.useRouter}}),r.o(s,"useSearchParams")&&r.d(t,{useSearchParams:function(){return s.useSearchParams}})},17509:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var s=r(62740),a=r(21540);function i({children:e}){return(0,s.jsxs)("main",{className:"relative flex flex-col grow",children:[(0,s.jsx)(a.A,{multiple:!0}),e]})}},61149:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s=(0,r(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\Users\\\\tomir\\\\OneDrive\\\\Desktop\\\\AssetlyLandingPage\\\\client\\\\app\\\\(auth)\\\\signup\\\\layout.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\Users\\tomir\\OneDrive\\Desktop\\AssetlyLandingPage\\client\\app\\(auth)\\signup\\layout.tsx","default")},2705:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o,metadata:()=>i});var s=r(62740),a=r(61149);let i={title:"Sign Up - Assetly",description:"Page description"};function o(){return(0,s.jsx)(a.default,{})}},21540:(e,t,r)=>{"use strict";r.d(t,{A:()=>l});var s=r(62740),a=r(35635),i=r(22e3),o=r(98388),n=r(24888);function l({multiple:e=!1}){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/4","aria-hidden":"true",children:(0,s.jsx)(a.default,{className:"max-w-none",src:i.default,width:846,height:594,alt:"Page illustration"})}),e&&(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"pointer-events-none absolute left-1/2 top-[400px] -z-10 -mt-20 -translate-x-full opacity-50","aria-hidden":"true",children:(0,s.jsx)(a.default,{className:"max-w-none",src:o.default,width:760,height:668,alt:"Blurred shape"})}),(0,s.jsx)("div",{className:"pointer-events-none absolute left-1/2 top-[440px] -z-10 -translate-x-1/3","aria-hidden":"true",children:(0,s.jsx)(a.default,{className:"max-w-none",src:n.default,width:760,height:668,alt:"Blurred shape"})})]})]})}},98388:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s={src:"/_next/static/media/blurred-shape-gray.4be07fa5.svg",height:668,width:760,blurWidth:0,blurHeight:0}},16948:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s={src:"/_next/static/media/blurred-shape-gray.4be07fa5.svg",height:668,width:760,blurWidth:0,blurHeight:0}},24888:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s={src:"/_next/static/media/blurred-shape.089e0f40.svg",height:668,width:760,blurWidth:0,blurHeight:0}},25560:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s={src:"/_next/static/media/blurred-shape.089e0f40.svg",height:668,width:760,blurWidth:0,blurHeight:0}},22e3:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s={src:"/_next/static/media/page-illustration.3cec8b53.svg",height:594,width:846,blurWidth:0,blurHeight:0}},31728:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s={src:"/_next/static/media/page-illustration.3cec8b53.svg",height:594,width:846,blurWidth:0,blurHeight:0}},77144:(e,t,r)=>{"use strict";r.d(t,{A:()=>s});let s=(0,r(94825).A)("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]])},25637:(e,t,r)=>{"use strict";r.d(t,{A:()=>s});let s=(0,r(94825).A)("CircleCheckBig",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]])},45174:(e,t,r)=>{"use strict";r.d(t,{A:()=>s});let s=(0,r(94825).A)("EyeOff",[["path",{d:"M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",key:"ct8e1f"}],["path",{d:"M14.084 14.158a3 3 0 0 1-4.242-4.242",key:"151rxh"}],["path",{d:"M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",key:"13bj9a"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]])},82446:(e,t,r)=>{"use strict";r.d(t,{A:()=>s});let s=(0,r(94825).A)("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]])},26753:(e,t,r)=>{"use strict";r.d(t,{A:()=>s});let s=(0,r(94825).A)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]])}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[994,659,902,635,81],()=>r(21774));module.exports=s})();