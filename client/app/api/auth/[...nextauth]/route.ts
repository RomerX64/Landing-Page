import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (!session.user) throw "";
      session.user.id = token.sub;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${process.env.NEXT_PUBLIC_API_URL}/`;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
