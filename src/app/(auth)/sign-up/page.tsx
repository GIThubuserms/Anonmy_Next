"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signupschema } from "@/schemas/signupschema";
import axios, { AxiosError } from "axios";
import { useDebounceCallback } from "usehooks-ts";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Page() {
  const [username, setusername] = useState("");
  const [usernameerrormessage, setusernameerrormessage] = useState("");
  const [isusernamechecking, setisusernamechecking] = useState(false);
  const [isloading, setisloading] = useState(false);
  const router=useRouter()

  const debounced = useDebounceCallback(setusername, 300);
  const form = useForm<z.infer<typeof signupschema>>({
    resolver: zodResolver(signupschema)
  });
  useEffect(() => {
    if (username) {
      const checkusername = async () => {
        try {
          setisusernamechecking(true);
          setusernameerrormessage("");
          console.log(username);

          const response = await axios.get(
            `/api/checkUsernameUnique?username=${username}`
          );
          console.log(response);
          console.log(username);

          if (response.data) {
            if (response.data.success === false) {
              toast.error(response.data.message);
              setusernameerrormessage(response.data.message);
            }
            if (response.data.success === true) {
              setusernameerrormessage(response.data.message);
            }
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            setusernameerrormessage(error.message);
          } else {
            setusernameerrormessage("Error while Checking Username");
          }
        } finally {
          setisusernamechecking(false);
        }
      };

      checkusername();
    }
  }, [username]);

  const onsubmit = async (formdata: z.infer<typeof signupschema>) => {
    try {
      setisloading(true);
      const response = await axios.post("/api/signup", formdata);

      if (response) {
        if (response.data.success === false) {
          toast.error(response.data.message);
        }
        if (response.data.success === true) {
          toast.success(response.data.message);
          router.push(`/verify/${username}`)
        }
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
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join True Feedback
          </h1>
          <p className="mb-4">Sign up to start your anonymous adventure</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                  
                      type="text"
                      placeholder="username"
                      {...field}
                    
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                    />
                  </FormControl>
                  {isusernamechecking && <Loader2 className="animate-spin" />}
                  {usernameerrormessage && (
                    <p
                      className={`${usernameerrormessage ? "text-gray-600" : "text-red-500"} text-sm`}
                    >
                      {usernameerrormessage}
                    </p>
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />

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
            Already a member?{" "}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;
