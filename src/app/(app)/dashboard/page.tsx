"use client";
import MessageCard from "@/components/MessageCard";
import { Switch } from "@/components/ui/switch";
import { message } from "@/models/user.model";
import { useState } from "react";

function Dashboard() {
  const [messages, setmessages] = useState<message[]>([]);
  const [isacceptingmessage, setisacceptingmessage] = useState(false);

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Copy your unique link</p>
      <Switch />
      <MessageCard/>
      <MessageCard />
      <MessageCard />
    </div>
  );
}

export default Dashboard;
