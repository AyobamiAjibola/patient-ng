import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      exp: number;
      iat: number;
      jti: string;
      level: number;
      accessToken: string;
      refreshToken: string;
      isAdmin: boolean;
      userType: string[];
      fullName: string;
    };
    update: any;
    status: string;
  }
}