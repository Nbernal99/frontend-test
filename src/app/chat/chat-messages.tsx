'use client';

type ChatMessagesProps = {
  messages: any[];
  socketId?: string;
};

export function ChatMessages({ messages, socketId }: ChatMessagesProps) {
  return (
    <ul className="space-y-2 max-h-96 overflow-y-auto p-3 border rounded-md">
      {messages.map((msg, i) => {
        const isMine = msg.fromId === socketId;
        return (
          <li
            key={i}
            className={`p-2 rounded-md ${isMine ? 'bg-blue-100 self-end text-right' : 'bg-gray-100 self-start text-left'}`}
          >
            <span className="font-medium">{isMine ? 'Tú' : msg.fromId.slice(0,4)}</span>: {msg.text}
          </li>
        );
      })}
    </ul>
  );
}
