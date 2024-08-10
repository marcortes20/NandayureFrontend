import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        UserId: {
          label: "Identificacion",
          type: "text",
          placeholder: "5-5555-5555",
          value: "504420108",
        },
        Password: { label: "Contraseña", type: "password", value: "1234" },
      },

      async authorize(credentials, req) {
        console.log(credentials);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/login`, //create service to make fetch
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();

        if (res.ok && user) {
          return user;
        }
        if (user.error) {
          console.log(user.error);
          throw user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user) return true;

      return false;
    },
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
};
