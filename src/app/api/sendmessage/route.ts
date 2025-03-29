import dbconnection from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User, { message } from "@/models/user.model";

export const POST = async (req: NextRequest) => {

  try {
    await dbconnection()
    const {username,context}=await req.json()
   

    const dbicominguser=await User.findOne({
      username:username
    })

    if(!dbicominguser){
      return NextResponse.json(
      {
        message: "User not found with that username",
        success: false,
      },
      { status: 404 }
    );
    }

    if(!dbicominguser.isAcceptingMessage){
      return NextResponse.json(
        {
          message: "User is not accepting messages",
          success: true,
        },
        { status: 200 }
      );

    }
  
    const newmessage={
      content:context,
      craetedAt:new Date()
    }

    dbicominguser.message.push(newmessage as message)
    
    await dbicominguser.save()    

    return NextResponse.json(
        {
          message: "Message send sucessfully",
          success: true,
        },
        { status: 200 }
      );


  } catch (error) {
    console.log("Error in sending message" + error);
    return NextResponse.json(
      {
        message: "Error in sending message",
        success: false,
      },
      { status: 505 }
    );
  }
};
