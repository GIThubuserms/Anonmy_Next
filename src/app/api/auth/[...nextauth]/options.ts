import dbconnection from "@/lib/dbConnect";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { NextResponse } from "next/server";


export const authoptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "Email" },
                password: { label: "password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials):Promise<any> {
                try {
                    await dbconnection()
                    console.log("123");
                    
                    console.log(credentials?.email);
                    console.log(credentials?.password);
                    
                    if (!credentials?.email || !credentials?.password) {
                        throw new Error("Credentials are required")
                    }
                    
                    console.log("123");


                    const isUserExist = await User.findOne({
                        $or: [{ email:credentials?.email }]
                    })
                    console.log("123");


                    if (!isUserExist) {
                        throw new Error("User Doesnot Exist")
                    }
                    console.log("123");

                    if (!isUserExist?.isVerfied) {
                        throw new Error("User is not verify")
                    }
                    const isPasswordCorrect=await bcrypt.compare(String(credentials?.password),isUserExist.password)
                    console.log("123");

                    if(!isPasswordCorrect){
                        throw new Error("Password is incorrect")
                    }
                    
                    return isUserExist

                } catch (error) {
                    if(error instanceof Error){
                        throw new Error(error)
                    }
                }
            },
        })
    ],

    callbacks: {
          async jwt({ token, user }) {
            if(user){
                token._id=user._id?.toString()
                token.username=user.username
                token.isVerfied=user.isVerfied
                token.isAcceptingMessage=user.isAcceptingMessage
            }
            return token
          },
          async session({ session,token }) {
            session.user.id=token._id
            session.user.username=token.username
            session.user.isVerfied=token.isVerfied
            session.user.isAcceptingMessage=token.isAcceptingMessage
            return session
          }

    },
    pages: {
        signIn:'/sign-in',
    },
    session: {
       strategy:'jwt'
    },
    secret:"nextauth"
}