'use client';

import { useState } from "react";

type ChatInputProps = {
  onSend: (text: string) => void;
};

export function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="flex mt-2 space-x-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 p-2 border rounded-md"
        placeholder="Escribe un mensaje"
      />
      <button onClick={handleSend} className="px-4 py-2 bg-blue-600 text-white rounded-md">
        Enviar
      </button>
    </div>
  );
}
