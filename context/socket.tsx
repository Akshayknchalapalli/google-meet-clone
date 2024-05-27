import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

// Define SocketContext
const SocketContext = createContext<Socket | null>(null);

// Define useSocket hook
export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

// Define SocketProvider component
export const SocketProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const connection = io();
    console.log("socket connection", connection)
    setSocket(connection);
  }, []);

  socket?.on('connect_error', async (err) => {
    console.log("Error establishing socket", err)
    await fetch('/api/socket')
  })

  // Return SocketContext.Provider with value and children
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
