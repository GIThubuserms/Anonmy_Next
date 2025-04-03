"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { verifyTokenschema } from "../../../../schemas/verifyschema";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useParams, useRouter } from "next/navigation";

function Page() {

  const form = useForm<z.infer<typeof verifyTokenschema>>({
    resolver: zodResolver(verifyTokenschema),
  });
  const params=useParams()
 
  const username=params.username
  
  const router=useRouter()
  const [loading, setisloading] = useState(false);
 

  const Onsubmit = async (data: z.infer<typeof verifyTokenschema>) => {
    try {
      setisloading(true);
      const response = await axios.post("/api/verifycode", {username:username,UserverifyCode:data.code});
      if (response.data.success === false) {
        toast.error(response.data.message);
      }
      if (response.data.success === true) {
        toast.success(response.data.message);
        setTimeout(() => {
          router.push("/sign-in");
        }, 500);
      }
      
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.message);
      } else {
        toast.error("Error while SigningUp");
      }
    } finally {
      setisloading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
          Verify Your Account
        </h1>
        <p className="mb-4">Enter the verification code sent to your email</p>
      </div>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(Onsubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verify Code</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Verify your code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  </div>
  )
}



export default Page;
