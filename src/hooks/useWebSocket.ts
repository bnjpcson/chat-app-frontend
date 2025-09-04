// src/hooks/useWebSocket.ts

import { MessageState } from "@/stores/message";
import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";

// Custom Hook to handle WebSocket connection
const useWebSocket = () => {
  const [message, setMessage] = useState<MessageState | null>(null);
  const [status, setStatus] = useState<
    "connecting" | "disconnected" | "connected"
  >("connecting");

  const socketRef = useRef<WebSocket | null>(null);
  const VITE_API_WEBSOCKET_URL = import.meta.env.VITE_API_WEBSOCKET_URL;

  const setupWebSocket = useCallback(() => {
    if (socketRef.current) {
      if (status == "connected") {
        socketRef.current.close();
      }
    }

    setStatus("connecting");
    const socket = new WebSocket(VITE_API_WEBSOCKET_URL);
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");
      setStatus("connected");
    };

    socket.onmessage = (event: MessageEvent) => {
      const newMessage: MessageState = JSON.parse(event.data);
      setMessage(newMessage);
    };

    socket.onerror = (error: Event) => {
      console.error("WebSocket error:", error);
      toast.error("Failed to establish a connection. Please try again.");
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      setStatus("disconnected");
    };
  }, [VITE_API_WEBSOCKET_URL]);

  // Initial connection on mount
  useEffect(() => {
    setupWebSocket();

    return () => {
      if (socketRef.current) {
        if (status == "connected") {
          socketRef.current.close();
        }
      }
    };
  }, [setupWebSocket]);

  // Send a message through WebSocket
  const sendMessage = useCallback((message: string) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(message);
    } else {
      console.error("WebSocket is not open");
    }
  }, []);

  // Reconnect function to expose
  const reconnect = useCallback(() => {
    console.log("Reconnecting WebSocket...");
    setupWebSocket();
  }, [setupWebSocket]);

  return { message, status, sendMessage, reconnect };
};

export default useWebSocket;
