"use client";

type ChatMessagesProps = {
  messages: {
    id: number;
    text: string;
    fromId: string;
    time: string;
  }[];
  socketId?: string;
};

export function ChatMessages({ messages, socketId }: ChatMessagesProps) {
  return (
    <ul className="space-y-2 flex-1 overflow-y-auto p-3 flex flex-col">
      {messages.map(msg => {
        const isMine = msg.fromId === socketId;
        return (
          <li
            key={msg.id}
            className={`inline-block p-2 rounded-md w-fit max-w-[75%] ${
              isMine ? "bg-blue-100 self-end text-right" : "bg-gray-100 self-start text-left"
            }`}
          >
            <p>
              <span className="font-medium">{isMine ? "Tú" : msg.fromId.slice(0, 4)}</span>: {msg.text}
            </p>
            <p className="text-xs text-gray-500 mt-1 text-right">
              {msg.time}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
