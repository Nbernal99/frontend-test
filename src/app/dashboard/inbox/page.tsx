import InboxList from "@/components/InboxList";
import ChatWindow from "@/components/ChatWindow";

export default function InboxPage() {
  return (
    <div className="flex h-full">
      <InboxList />
      <ChatWindow />
    </div>
  );
}
