// RootLayout.tsx
import "./css/style.css";

import { Inter } from "next/font/google";
import localFont from "next/font/local";

import Header from "@/components/ui/header";
import { AdminProvider } from "@/context/Administracion.context";
import { SuscribeProvider } from "@/context/Suscribe.context";
import { UserProvider } from "@/context/user.context";
import { SessionProvider } from "next-auth/react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { JSX, ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const nacelle = localFont({
  src: [
    {
      path: "../public/fonts/nacelle-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/nacelle-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/nacelle-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/nacelle-semibolditalic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-nacelle",
  display: "swap",
});
export default function RootLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const token = process.env.NEXT_PUBLIC_APP_MP_TOKEN;
  initMercadoPago(token ? token : "");

  return (
    <html lang="en">
      <SessionProvider>
        <AdminProvider>
          <UserProvider>
            <SuscribeProvider>
              <body
                className={`${inter.variable} ${nacelle.variable} bg-gray-950 font-inter text-base text-gray-200 antialiased`}
              >
                <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
                  <Header />
                  {children}
                </div>
              </body>
            </SuscribeProvider>
          </UserProvider>
        </AdminProvider>
      </SessionProvider>
    </html>
  );
}
