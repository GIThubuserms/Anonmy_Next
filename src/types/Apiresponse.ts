import { message } from "@/models/user.model";

export interface Apiresponse{
    success:boolean,
    message:string,
    isUserAccepting?:boolean,
    messages?:Array<message>
}