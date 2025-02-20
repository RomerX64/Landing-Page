// app/layout.tsx

import ClientRootLayout from "./clientRootLayout";

export default function App({ children }: { children: React.ReactNode }) {
  return <ClientRootLayout>{children}</ClientRootLayout>;
}
