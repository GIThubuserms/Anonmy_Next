import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authoptions } from "../auth/[...nextauth]/options"
import User from "@/models/user.model"
import dbconnection from "@/lib/dbConnect"


// we post a request to toggle the user accepting message button 
export const POST=async(req:NextRequest)=>{
       await dbconnection()
    try {
        const {isacceptingmessage}=await req.json()
        const session=await getServerSession(authoptions)
        const loggedInUser=session?.user

        console.log(loggedInUser);

        const dbIncomingUser=await User.findOneAndUpdate(
            loggedInUser._id,
            {isAcceptingMessage:isacceptingmessage},
            {$new:true}
        )
    
       if(!dbIncomingUser){
        return NextResponse.json(
            {
              message: "User is Not Found",
              success: false,
            },
            { status: 404 }
          );
            
       } 
       
       return NextResponse.json(
        {
          message: "User accepting message changed ",
          data:dbIncomingUser.isAcceptingMessage,
          success: true,
        },
        { status: 200 }
      );

        
    } catch (error) {
        console.log("Error in Accepting Message " + error);
        return NextResponse.json(
            {
              message: "Error in Accepting Message ",
              success: false,
            },
            { status: 505 }
          );

    }
}

// we get a request to check is user accepting message 
export const GET=async()=>{
       await dbconnection()
    try {
        const session=await getServerSession(authoptions)
        const loggedInUser=session?.user

        console.log(loggedInUser);

        const dbIncomingUser=await User.findById(loggedInUser._id)
    
       if(!dbIncomingUser){
        return NextResponse.json(
            {
              message: "User Not Found",
              success: false,
            },
            { status: 404 }
          );
       } 
       
       return NextResponse.json(
        {
          message: "User accepting message changed ",
          data:dbIncomingUser.isAcceptingMessage,
          success: true,
        },
        { status: 200 }
      );

        
    } catch (error) {
        console.log("Error in Accepting Message " + error);
        return NextResponse.json(
            {
              message: "Error in Accepting Message ",
              success: false,
            },
            { status: 505 }
          );

    }
}


