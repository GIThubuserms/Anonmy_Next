import dbconnection from "@/lib/dbConnect"
import { NextRequest, NextResponse } from "next/server"

export const POST=async(req:NextRequest)=>{
 try {
    await dbconnection()
    const {token}=req.body
    
     // i take token from body and then verify it from backend 
     // if match user comes
     // i assigned isVerfied =true
     // save 



 } catch (error) {
    console.log("Error in Verifying Code "+error)
    return NextResponse.json({
        message:"Error in Verfying Code",
        success:false
    },{status:505})
 }

}