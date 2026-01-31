'use client';

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

type Message = {
  id: string;      // socketId del remitente
  text: string;
};

export function useSocket() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [socketId, setSocketId] = useState<string>('');
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io('http://localhost:4000'); // Cambia al puerto de tu servidor

    socket.current.on('connect', () => {
      if (socket.current?.id) {
        setSocketId(socket.current.id);
      }
    });

    socket.current.on('message', (msg: Message) => {
      setMessages(prev => [...prev, msg]);
    });

    socket.current.on('users', (usersList: string[]) => {
      setUsers(usersList);
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const sendMessage = (text: string) => {
    if (!socket.current) return;
    socket.current.emit('message', { id: socketId, text });
  };

  return { messages, users, sendMessage, socketId };
}
