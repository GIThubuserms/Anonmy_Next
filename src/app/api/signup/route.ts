import { SendEmail } from "@/helpers/sendVerificationEmail";
import dbconnection from "@/lib/dbConnect";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Flow is to check weather user exits or not if exist is verified or not if verified return with user exist if not then verify and
  // send email if user not exist then create and email

  try {
    await dbconnection();
    const { username, email, password } = await req.json();
    const verifycode = String(Math.floor(100000 + Math.random() * 100000 + 1));

    const IsUserExists = await User.findOne({ email: email });

    if (IsUserExists) {
      if (IsUserExists.isVerfied) {
        return NextResponse.json(
          {
            message: "User already exists and verified",
            success: false,
          },
          { status: 403 }
        );
      }
      // if it is not verified --->  we create a token || store in db create expiry || send email || update password
      const Hashedpassword = await bcrypt.hash(password, 10);
      const currentdate = new Date();
      currentdate.setHours(currentdate.getHours() + 1);
      IsUserExists.password = Hashedpassword;
      IsUserExists.verifycode = verifycode;
      IsUserExists.verfiycodeexpiry = currentdate;
      await IsUserExists.save();
    }

    if (!IsUserExists) {
      const Hashedpassword = await bcrypt.hash(password, 10);
      const currentdate = new Date();
      currentdate.setHours(currentdate.getHours() + 1);

      const newDbUser = await User.create({
        username,
        email,
        password: Hashedpassword,
        verifycode: verifycode,
        isVerfied: false,
        verfiycodeexpiry: currentdate,
        isAcceptingMessage: true,
        message: [],
      });

      if (!newDbUser) {
        return NextResponse.json(
          {
            message: "Error while creating a User",
            success: false,
          },
          { status: 502 }
        );
      }
    }

    await SendEmail(username, verifycode, email);
    return NextResponse.json(
      {
        message: "User Registred Sucessfully",
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error while creating a user" + error);

    return NextResponse.json(
      {
        message: "Error while creating a User",
        success: false,
      },
      { status: 402 }
    );
  }
}
