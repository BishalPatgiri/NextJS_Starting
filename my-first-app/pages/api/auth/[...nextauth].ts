import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import GithubProvider from "next-auth/providers/github"
import EmailProvider from "next-auth/providers/email"
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
    //@ts-ignore

import clientPromise from "../../../database/connectDb"



export const authOptions = {
      //@ts-ignore

  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_ID!,
        clientSecret: process.env.GOOGLE_SECRET!,
      }),
      EmailProvider({
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: process.env.EMAIL_SERVER_PORT,
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD,
          },
        },
        from: process.env.EMAIL_FROM,
      }),
  ],
    callbacks: {
    async session({ session, token, user }:any) {
      // const data=await prisma.onboarding.findMany({where:{entityShortName: 'Bishal'}})
      // console.log(data)
      // session.role=data[0].entityRepresentativeRole; 
      console.log(session)
      console.log(token)
      return session;
    }
  }
}
export default NextAuth(authOptions)