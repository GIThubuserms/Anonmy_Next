"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginschema } from "@/schemas/loginschema";
import { signIn } from "next-auth/react";

function Page() {
  
 
  const [isloading, setisloading] = useState(false);
  const router=useRouter()
  const form = useForm<z.infer<typeof loginschema>>({
    resolver: zodResolver(loginschema)
  });
 ;


  const onsubmit = async (formdata: z.infer<typeof loginschema>) => {
    try {
      setisloading(true);
    const result= await signIn("credentials",{
      redirect:false,
      email:formdata.email,
      password:formdata.password
    })
   console.log(result);
    
    if(result?.error){
      toast.error(result.error)
    }
    if(result?.ok){
      router.push('/sign-up')
    }

    } catch (error) {
      console.log(error);
        toast.error("Error while SigningIn");
     
    } finally {
      setisloading(false);
    }
  };

  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join True Feedback
          </h1>
          <p className="mb-4">Sign In to start your anonymous adventure</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
         

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" disabled={isloading} type="submit">
              Submit
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p>
            Donot Have a account?{" "}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
