import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { MessageState } from "@/stores/message";
import { v4 as uuidv4 } from "uuid";
import useStoreUser from "@/stores/user";
import useWebSocket from "@/hooks/useWebSocket";
import { toast } from "sonner";

export default function Bottom() {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  // const { messages, setMessages } = useStoreMessage();
  const { currentUser } = useStoreUser();
  const [message, setMessage] = useState<string>("");

  const { status, sendMessage } = useWebSocket();

  function handleSend(e: React.FormEvent | React.KeyboardEvent) {
    e.preventDefault();

    if (status != "connected" || !currentUser) {
      toast.error(
        "Unable to connect to the server. Please check your network connection or try again later."
      );
      return;
    }

    if (message == "") return;

    const newMessage: MessageState = {
      message_id: uuidv4(),
      user_id: currentUser.user_id,
      avatar: currentUser.avatar,
      user_name: currentUser.user_name,
      message: message,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    sendMessage(JSON.stringify(newMessage));
    setMessage("");
  }

  // Handle value changes in the textarea
  function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setMessage(e.currentTarget.value);
  }

  // Handle key presses (for "Enter" key detection)
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      // If "Enter" is pressed and Shift is not held down
      handleSend(e);
      // // Unfocus the textarea
      // if (textAreaRef.current) {
      //   textAreaRef.current.blur();
      // }
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 text-secondary text-center z-10 bg-white">
      <div className="flex flex-row gap-2 items-center p-2 justify-center">
        <Textarea
          ref={textAreaRef}
          className="min-h-0 max-h-24 resize-none bg-gray-100 text-black"
          placeholder="Type your message here."
          name="message"
          value={message}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={(e) => handleSend(e)}>Send</Button>
      </div>
    </div>
  );
}
