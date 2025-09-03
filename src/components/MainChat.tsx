import useStoreMessage, { MessageState } from "@/stores/message";
import React, { useEffect, useRef } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import useStoreUser from "@/stores/user";

export default function MainChat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages } = useStoreMessage();
  const { currentUser } = useStoreUser();

  // Scroll to the bottom whenever the messages state changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); // This will run whenever the messages array changes

  function getInitials(name: string): string {
    const nameParts = name.trim().split(" ");

    if (nameParts.length === 1) {
      // If there is only one word, return the word itself
      return nameParts[0][0];
    } else if (nameParts.length >= 2) {
      // If there are multiple parts (first name, last name), return initials
      const firstInitial = nameParts[0][0].toUpperCase(); // First letter of the first name
      const lastInitial = nameParts[nameParts.length - 1][0].toUpperCase(); // First letter of the last name
      return `${firstInitial}${lastInitial}`;
    }
    return "";
  }

  const DisplayFromMesage = React.memo(
    ({ message }: { message: MessageState }) => {
      if (currentUser == null) return;
      const isUser = message.user_id == currentUser.user_id;
      return (
        <div
          className={`flex flex-row gap-1 w-full items-end ${
            isUser ? "justify-end" : "justify-start"
          }`}
        >
          {!isUser && (
            <Avatar>
              <AvatarFallback>{getInitials(message.user_name)}</AvatarFallback>
            </Avatar>
          )}
          <div className="flex flex-col gap-1 max-w-[60%]">
            {!isUser && <span className="text-sm">{message.user_name}</span>}
            <div>
              <div className="inline-block bg-primary text-secondary text-start rounded-2xl px-3 py-2">
                {message.message}
              </div>
            </div>
          </div>
        </div>
      );
    }
  );

  return (
    <div className="flex-1 py-14 px-2">
      <div className="flex flex-col gap-2 items-end h-full justify-end overflow-y-auto">
        {messages.map((message) => {
          return (
            <DisplayFromMesage message={message} key={message.message_id} />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
