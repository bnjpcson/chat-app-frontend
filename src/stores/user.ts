// src/store/user.ts
import { create } from "zustand";

export type UserState = {
  user_id: string;
  user_name: string;
  avatar: string;
  created_at: string;
  updated_at: string;
};

// Define the types for the store state
interface UsersState {
  users: UserState[];
  setUsers: (user: UserState[]) => void;
  currentUser: UserState | null;
  setCurrentUser: (user: UserState) => void;
}

// Create the Zustand store with type annotations
const useStoreUser = create<UsersState>((set) => ({
  users: [], // Initialize the `users` array
  setUsers: (users: UserState[]) => set(() => ({ users: users })), // Add new user immutably\
  currentUser: null,
  setCurrentUser: (user: UserState) => set(() => ({ currentUser: user })), // Add new user immutably
}));

export default useStoreUser;
