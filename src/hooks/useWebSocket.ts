// src/hooks/useWebSocket.ts

import { MessageState } from "@/stores/message";
import { useState, useEffect, useRef, useCallback } from "react";

// Custom Hook to handle WebSocket connection
const useWebSocket = () => {
  const [message, setMessage] = useState<MessageState | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  const VITE_API_WEBSOCKET_URL = import.meta.env.VITE_API_WEBSOCKET_URL;

  // Initialize WebSocket connection
  useEffect(() => {
    socketRef.current = new WebSocket(VITE_API_WEBSOCKET_URL);

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
    };

    socketRef.current.onmessage = (event: MessageEvent) => {
      const newMessage: MessageState = JSON.parse(event.data);
      setMessage(newMessage);
    };

    socketRef.current.onerror = (error: Event) => {
      console.error("WebSocket error:", error);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    };

    // Cleanup WebSocket connection when component unmounts
    return () => {
      if (isConnected) {
        socketRef.current?.close();
      }
    };
  }, []);

  // Send a message through WebSocket
  const sendMessage = useCallback((message: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    } else {
      console.error("WebSocket is not open");
    }
  }, []);

  return { message, isConnected, sendMessage };
};

export default useWebSocket;
