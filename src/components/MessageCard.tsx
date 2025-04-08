"use client";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import {X } from "lucide-react";
import { message } from "@/models/user.model";
import axios from "axios";
import { toast } from "sonner";

type messagecardargs={
    message?:message,
    handledeletemessage?:()=>void
}

function MessageCard({message,handledeletemessage}:messagecardargs) {


  const handledelete=async()=>{
    try {
      const response= await axios.delete(`/api/deletemessage?messageid=${message._id}`)

      if(response.data.success===true){
        toast.message(response.data.message)
      } 
    if(response.data.success===false){
      toast.message(response.data.message)
    }
    } catch (error) {
      console.log(error);
   toast.error(error )      
    }
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>{message?.content}</CardTitle>
        <CardDescription>{message?.craetedAt}</CardDescription>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">
              <X className="w-5 h-5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                message
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handledelete}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardHeader>
    </Card>
  );
}

export default MessageCard;
