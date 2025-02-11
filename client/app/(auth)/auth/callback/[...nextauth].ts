import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Redirige a una página personalizada de login si lo deseas
    error: "/auth/error", // Página de error en caso de fallo en el login
  },
  callbacks: {
    async jwt({
      token,
      account,
      user,
    }: {
      token: JWT;
      account: any;
      user: any;
    }) {
      if (account && user) {
        token.accessToken = account.access_token as string; // Asegura que sea un string
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (typeof token.accessToken === "string") {
        session.accessToken = token.accessToken; // Agrega el token a la sesión
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Un secreto para proteger las sesiones
};

export default NextAuth(authOptions);
