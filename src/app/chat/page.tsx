'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

type Message = {
  id: number;
  text: string;
  sender: 'Tu';
  time: string;
};

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'Tu',
      time: new Date().toLocaleTimeString(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
  };

  return (
    <div className="p-5 max-w-xl mx-auto flex flex-col h-[80vh]">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
      >
        Volver
      </button>

      <h1 className="text-2xl font-bold mb-4">Chat</h1>

      <div className="flex-1 overflow-y-auto border rounded-md p-3 space-y-3">
        {messages.length === 0 && (
          <p className="text-gray-400 text-center">No hay mensajes</p>
        )}

        {messages.map(msg => (
          <div key={msg.id} className="flex justify-end">
            <div className="max-w-[70%] bg-blue-100 p-3 rounded-lg">
              <p className="font-medium text-sm">{msg.sender}:</p>
              <p className="text-xs text-gray-500 mb-1">{msg.time}</p>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-3">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Escribe tu mensaje..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 rounded bg-gray-800 text-white hover:bg-gray-700 transition"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
