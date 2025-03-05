import { SendVerficationEmail } from "@/helpers/sendVerificationEmail";
import dbconnection from "@/lib/dbConnect";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  // Flow is to check weather user exits or not if exist is verified or not if verified return with user exist if not then verify and
  // send email if user not exist then create and email

  await dbconnection();

  try {

    const { username, email, password } = await req.json();
    const isuserexists = await User.findOne({email});
    const verifycode = String(1000 + Math.floor(Math.random() * 10000) + 1)

    if (isuserexists) {
      if (isuserexists.isVerfied) {
        return Response.json({
          success: false,
          message: "User already exists",
        },{status:400});
      }
      else{
        // update the credantials and exit the loop
        isuserexists.password = await bcrypt.hash(password, 10);
        const newexpdate = new Date();
        newexpdate.setHours(newexpdate.getHours() + 1);
        isuserexists.verfiycodeexpiry = newexpdate;
        isuserexists.isVerfied = true;
        await isuserexists.save();
      }
    }
    if (!isuserexists) {
      const hashedpass=await bcrypt.hash(password,10)
      const newexpdate = new Date();
      newexpdate.setHours(newexpdate.getHours() + 1);

      
      const newCreatedUser=await User.create({
      username:username,
      email:email,
      password:hashedpass,
      verifycode:verifycode,
      isVerfied:false,
      verfiycodeexpiry:newexpdate,
      isAcceptingMessage: true,
      message:[]
      })

     await newCreatedUser.save()
    }

    const emailsending=await SendVerficationEmail({username,otp:verifycode,email})
    if(!emailsending.success){
        return Response.json({
            success: false,
            message: "Error while sending a Email",
          },{status:400}); 
    }


    return Response.json({
        success: true,
        message: "User Regsistred SuccessFull Please Verify now ",
      },{status:200});

  } catch (error) {
    console.log("Error in registering user" + error);
    return Response.json({
      success: false,
      message: "Error while registering a User",
    },{status:402});
  }
}






