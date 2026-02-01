"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessages } from "./ChatMessages";

type Message = {
  id: number;
  text: string;
  fromId: string;
  time: string;
};

type User = {
  id: number;
  name: string;
};

async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!res.ok) {
    throw new Error("Error cargando usuario");
  }
  return res.json();
}

export default function ChatWindow() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const [messages, setMessages] = useState<Message[]>([]);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    if (!userId) return;

    setMessages([]);

    fetchUser(userId).then(user => setUserName(user.name));
  }, [userId]);

  const handleSend = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      fromId: "me",
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };

    setMessages(prev => [...prev, newMessage]);
  };

  if (!userId) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        Selecciona una conversación
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col border-r bg-white">
      <div className="p-4 border-b font-semibold text-center">
        {userName || "Cargando..."}
      </div>

      <ChatMessages messages={messages} socketId="me" />

      <div className="p-3 border-t">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
