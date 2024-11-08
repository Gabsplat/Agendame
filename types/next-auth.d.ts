// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    id: string;
    id_token: string;
    accessToken: string;
  }

  interface JWT {
    id: string;
    id_token: string;
  }
}
