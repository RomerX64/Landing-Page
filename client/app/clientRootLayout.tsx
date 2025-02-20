// ClientRootLayout.tsx
"use client";

import { SWRConfig } from "swr";
import RootLayout from "./rootlayout";

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SWRConfig value={{ revalidateOnFocus: false }}>
      <RootLayout>{children}</RootLayout>
    </SWRConfig>
  );
}
