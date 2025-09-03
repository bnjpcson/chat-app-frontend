// src/store/message.ts
import { create } from "zustand";

export type MessageState = {
  message_id: string;
  user_id: string;
  user_name: string;
  avatar: string;
  message: string;
  created_at: string;
  updated_at: string;
};

// Define the types for the store state
interface MessagesState {
  messages: MessageState[];
  setMessages: (messages: MessageState[]) => void;
}

// Create the Zustand store with type annotations
const useStoreMessage = create<MessagesState>((set) => ({
  messages: [], // Initialize the `messages` array
  setMessages: (messages: MessageState[]) => set(() => ({ messages })), // Add new message immutably
}));
export default useStoreMessage;
