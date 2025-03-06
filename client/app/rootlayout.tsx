// RootLayout.tsx
import "./css/style.css";

import { Inter } from "next/font/google";
import localFont from "next/font/local";

import Header from "@/components/ui/header";
import { AdminProvider } from "@/context/Administracion.context";
import { UserProvider } from "@/context/user.context";
import { SessionProvider } from "next-auth/react";
import { JSX, ReactNode } from "react";
import { SubscriptionProvider } from "@/context/Suscribe.context";
import { PlansProvider } from "@/context/Planes.context";
import { initMercadoPago } from "@mercadopago/sdk-react";

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
  initMercadoPago("APP_USR-8c3216f3-8ec0-4106-9522-f580b88cf1c4");


  return (
    <html lang="en">
      <SessionProvider>
        <AdminProvider>
          <UserProvider>
            <SubscriptionProvider>
              <PlansProvider>
                <body
                  className={`${inter.variable} ${nacelle.variable} bg-gray-950 font-inter text-base text-gray-200 antialiased`}
                >
                  <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
                    <Header />
                    {children}
                  </div>
                </body>
              </PlansProvider>
            </SubscriptionProvider>
          </UserProvider>
        </AdminProvider>
      </SessionProvider>
    </html>
  );
}
