import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
          clientId: process.env.clientId,
          clientSecret: process.env.clientSecret
        })
      ],
      secret:process.env.CLAVE_TOKEN
}

export default NextAuth(authOptions);