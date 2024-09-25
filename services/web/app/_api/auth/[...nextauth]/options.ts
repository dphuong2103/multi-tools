import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { login, refreshToken, signUp } from "@/lib/apis/authenticate_api";

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      id: "loginCredentials",
      name: "loginCredentials",
      credentials: {
        email: {
          label: "Username:",
          type: "text",
        },
        password: {
          label: "Password:",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          const res = await login({
            email: credentials.email,
            password: credentials.password,
          });
          return res.data;
        } catch (err) {
          console.log("Error: ", err);
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: "signUpCredentials",
      name: "signUpCredentials",
      credentials: {
        email: {},
        password: {},
        firstName: {},
        lastName: {},
      },
      async authorize(credentials) {
        if (!credentials) return null;

        if (
          !credentials?.email ||
          !credentials?.password ||
          !credentials.firstName ||
          !credentials.lastName
        ) {
          return null;
        }
        try {
          const res = await signUp({
            email: credentials.email,
            password: credentials.password,
            firstName: credentials.firstName,
            lastName: credentials.lastName,
          });
          console.log("Res: ", res);
          return res.data;
        } catch (err) {
          console.log("Error: ", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token.user as any;
      session.accessToken = token.accessToken as any;
      session.refreshToken = token.refreshToken as any;
      return session;
    },
  },
};
