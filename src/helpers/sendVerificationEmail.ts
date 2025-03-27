import GithubAccessTokenEmail from '../../emails/VerficationEmailTemplate';
import { Resend } from 'resend';
import { Apiresponse } from '../types/Apiresponse';


const resend=new Resend()


export const SendEmail=async (username:string,verifytoken:string,email:string) :Promise<Apiresponse>=>{
   try {
       await resend.emails.send({
       from: 'Acme <onboarding@resend.dev>',
       to: email,
       subject: 'Anonmy Verfication Code || Verfiy Code',
       react: GithubAccessTokenEmail({ username:username,verifytoken:verifytoken }),
     });
     return {success:true,message:"Email Send Successfully"}

   } catch (error) {
     console.log("Error in sending Email"+error);
     return {success:false,message:"Error in Sending email"}
   }
  };