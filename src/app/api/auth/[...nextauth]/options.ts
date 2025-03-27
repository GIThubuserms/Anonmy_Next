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
                    if (!credentials?.email || !credentials?.password) {

                    }

                    const isUserExist = await User.findOne({
                        $or: [{ email:credentials?.email }]
                    })

                    if (!isUserExist) {
                        return NextResponse.json({
                            message: "User Doesnot Exist",
                            success: false
                        }, { status: 404 })
                    }
                    if (!isUserExist?.isVerfied) {
                        return NextResponse.json({
                            message: "User Doesnot Verified",
                            success: false
                        }, { status: 403 })
                    }
                    const isPasswordCorrect=await bcrypt.compare(String(credentials?.password),isUserExist.password)

                    if(!isPasswordCorrect){
                        return NextResponse.json({
                            message: "User Password Incorrect",
                            success: false
                        }, { status: 406 })
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