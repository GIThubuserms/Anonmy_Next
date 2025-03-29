import dbconnection from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { getServerSession } from "next-auth";
import { authoptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";

export const POST = async (req: NextRequest) => {

  try {
    await dbconnection()
    const session=await getServerSession(authoptions)
    const user=session?.user
    // const userid= req.nextUrl.searchParams.get("userid")
    // console.log(userid);
    
    const mongooseUserId=new mongoose.Types.ObjectId(user._id)

    const UserAllMessages=await User.aggregate([
        {
            $match:{
            "_id":mongooseUserId
           }
        },
        {
            $unwind:"$message"
        },
        {
            $sort:{
                "message.craetedAt":-1
          }
        },
        {
            $group:{
               _id:"$_id",
               messages:{
                $push:"$message"
               }
            }
        }
    ])

     if(UserAllMessages.length<0){
        return NextResponse.json(
            {
              message: "User not found with that username",
              success: false,
            },
            { status: 404 }
          );
     }
   
      return NextResponse.json(
        {
          message: "User is not accepting messages",
          data:UserAllMessages[0],
          success: true,
        },
        { status: 200 }
      );

    } 
    catch (error) {
    console.log("Error in Fetching All messages" + error);
    return NextResponse.json(
      {
        message: "Error in Fetching All messages",
        success: false,
      },
      { status: 505 }
    );
  }
};
