import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "../prisma/prisma";
import bcrypt from "bcryptjs";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { username, password } = credentials as {
            username: string;
            password: string;
          };

          if (!username || !password) return null;

          const user = await prisma.user.findUnique({
            where: { username: username },
          });

          if (!user) return null;

          const isValid = await bcrypt.compare(password, user.password);

          if (!isValid) return null;

          return user;
        } catch (error) {
          console.error("Auth Error: ", error);
          return null;
        }
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: "__Secure-next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id!;
        token.name = user.name!;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user && token) {
        session.user.id = token.id;
        session.user.name = token.name;
      }
      return session;
    },
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;
      const isOnDashboard = pathname.startsWith("/dashboard");

      if (!isLoggedIn && isOnDashboard) {
        return Response.redirect(
          new URL(`/login?callbackUrl=${nextUrl.pathname}`, nextUrl)
        );
      }

      return true;
    },
  },
});
