import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("");

export const MessageContext = createContext();

export function MessageContextProvider({ children }) {
  const [socketMessage, setSocketMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState({});

  useEffect(() => {
    socket.emit("sent", socketMessage);
    socket.on("sentBack", (data) => {
      setReceivedMessage(data);
    });
  }, [socketMessage]);

  const providerData = {
    socketMessage,
    setSocketMessage,
    receivedMessage,
    setReceivedMessage,
  };

  return (
    <MessageContext.Provider value={providerData}>
      {children}
    </MessageContext.Provider>
  );
}
