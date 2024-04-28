import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
        email: string;
        exp: number;
        iat: number;
        jti: string;
        level: number;
        token: string;
        refreshToken: string;
    };
    update: any;
    status: string;
  }
}