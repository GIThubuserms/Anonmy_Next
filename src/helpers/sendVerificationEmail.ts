import { resend } from "@/lib/resend";
import { Apiresponse } from "../types/Apiresponse";
import { VerificationEmail } from "../../emails/VerficationEmailTemplate";

export interface verificationCRED {
  username: string;
  otp: string;
  email: string;
}

export async function SendVerficationEmail({
  username,
  otp,
  email,
}: verificationCRED): Promise<Apiresponse> {
  try {
    await resend.emails.send({
      from:'onboarding@resend.dev',
      to: email,
      subject: "Welcome to Anonmy | Verfication Code by anonmy",
      react: VerificationEmail({ username, otp }),
    });
    return { success: true, message: "Email send Successfully" };
  } catch (emailerror) {
    
    console.log("Error while sending Email :- " + emailerror);
    return { success: true, message: "Email send Successfully" };
  }
}
