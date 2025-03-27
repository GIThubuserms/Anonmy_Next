import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
export { default } from "next-auth/middleware"
 
export async function middleware(request: NextRequest) {

    const currentpath=request.nextUrl.pathname
    const token= await getToken({req:request})
    const Ispublicpath=currentpath==="/sign-in"||currentpath==="/sign-up"
  
    if(token && Ispublicpath){
        return NextResponse.redirect(new URL('/home', request.url))
    }
     
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/','/sign-in','/sign-up'],
}