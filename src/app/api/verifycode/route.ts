import dbconnection from "@/lib/dbConnect";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

     // i take token from body and then verify it from backend
    // if match user comes
    // i assigned isVerfied =true
    // save

  try {
    await dbconnection();
    const { username, UserverifyCode } = await req.json();
    console.log(username+UserverifyCode);
    
    

    const isUserExist = await User.findOne({
      username: username,
    });

    if (!isUserExist) {
      return NextResponse.json(
        {
          message: "User doesnot Exist",
          success: false,
        },
      );
    }

    const Correctcode = isUserExist.verifycode === UserverifyCode;
    console.log(Correctcode);
    
    const Correctexpiry = new Date(isUserExist.verfiycodeexpiry) > new Date() ;
    console.log(Correctcode);

   
    if (!Correctcode || !Correctexpiry) {
      return NextResponse.json(
        {
          message: "Token expires or Incorrect",
          success: false,
        }
      );
    }

    isUserExist.isVerfied = true;
    await isUserExist.save();

    return NextResponse.json(
      {
        message: "User Verfied ",
        success: true,
      },
    );
  } catch (error) {
    console.log("Error in Verifying Code " + error);
    return NextResponse.json(
      {
        message: "Error in Verfying Code",
        success: false,
      },
    );
  }
};






// <----message---->

// send message

     // hit a call
     
// delete message 
// does i accept message user control  

   // take user from user/nextauth                              
   // call from db and take isacceptingmesssage 
   // return true

// call from db is user accepting message person control
   
     // hit a call from db 
     // check isacceptingmessages=true
     // send true success / flag