import dbconnection from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authoptions } from "../auth/[...nextauth]/options";
import User from "@/models/user.model";
import { NextURL } from "next/dist/server/web/next-url";
import mongoose from "mongoose";

export const DELETE = async (
  req: NextRequest) => {
  try {
    await dbconnection()
   
   const messageid= req.nextUrl.searchParams.get("messageid")
   console.log(messageid);
   

    const session = await getServerSession(authoptions);
    const user = session?.user; 
   

    const UserFromDb = await User.findOneAndUpdate(
      user._id,
      {
        $pull: {messages:{_id:messageid} },
      },
      { $new: true }
    );

    if (!UserFromDb) {
      return NextResponse.json(
        {
          message: "Message Not found",
          success: false,
        },
        { status: 403 }
      );
    }

    return NextResponse.json(
        {
          message: "Message deleted sucessfully",
          success: true,
        },
        { status: 200 }
      );


  } catch (error) {
    console.log("Error in deleting message" + error);
    return NextResponse.json(
      {
        message: "Error in deleting message",
        success: false,
      },
      { status: 505 }
    );
  }
};
