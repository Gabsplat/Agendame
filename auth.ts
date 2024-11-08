import PostgresAdapter from "@auth/pg-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: parseInt(process.env.DATABASE_PORT || "5432", 10),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // allowDangerousEmailAccountLinking: false,
      authorization: {
        params: {
          scope: [
            "openid profile email https://www.googleapis.com/auth/calendar",
          ],
        },
      },
    }),
  ],
  adapter: PostgresAdapter(pool),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, trigger }) {
      console.log({
        token,
        user,
        account,
        trigger,
      });
      if (user) {
        // Esto solo ocurre la primera vez que el usuario se autentica
        console.log(user);
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }

      if (account) {
        token.accessToken = account.access_token;
        token.id_token = account.id_token;
      }

      return token;
    },
    async session({ session, token }) {
      session.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.image = token.picture as string;
      session.id_token = token.id_token as string;
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});
