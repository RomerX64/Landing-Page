// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // Agrega accessToken a la sesión
  }

  interface JWT {
    accessToken?: string; // Agrega accessToken al JWT
  }
}
