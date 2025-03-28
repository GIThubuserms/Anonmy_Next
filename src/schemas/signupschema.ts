import { z } from "zod";


 export const usernamevalidation=z
.string()
.min(3,{message:"Minimun Lenght is 3"})
.max(30,{message:"Maximum Lenght is 30"})

const emailvalidation=z
.string()
.email({message:"Invalid Email Address"})


export const signupschema=z.object({
  username:usernamevalidation,
  email:emailvalidation,
  password:z
  .string()
  .min(6, { message: 'Password must be at least 6 characters' })
})