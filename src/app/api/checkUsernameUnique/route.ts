import dbconnection from "@/lib/dbConnect";
import User from "@/models/user.model";
import { usernamevalidation } from "@/schemas/signupschema";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const GET = async (req: NextRequest) => {
  // take username from params or url
  // give it to schema of zod to verify that
  // then call db and check is that taken or not
  try {
    await dbconnection();
    const UsernameSchema = z.object({ username: usernamevalidation });

     const { searchParams } = new URL(req.url);

    const UsernameFromQuery = {
      username:searchParams.get("username"),
    };
  
    const ZodVerifiedUsername = UsernameSchema.safeParse(UsernameFromQuery);
    if (!ZodVerifiedUsername.success) {
      return Response.json(
        {
          success: false,
          message:'Invalid query parameters',
        }
      );
    }
    
    const isUsernameExists = await User.findOne({
      $and: [{ username: ZodVerifiedUsername?.data?.username }, { isVerfied: true }],
    });
console.log(isUsernameExists);
    if (isUsernameExists) {
      return NextResponse.json(
        {
          message: "Username is already taken",
          success: false,
        },
      
      );
    }

    return NextResponse.json(
      {
        message: "Username is unique",
        success: true,
      },
    
    );
  } catch (error) {
    console.log("Error in checking unique Username" + error);
    return NextResponse.json(
      {
        message: "Error in Checking Uniqueness of Username",
        success: false,
      },
      { status: 503 }
    );
  }
};
