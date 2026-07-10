import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL.replace("/api", "");

const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

socket.on("connect", () => {
  // console.log("🟢 Socket Connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  // console.log("🔴 Socket Disconnected:", reason);
});

socket.on("connect_error", (err) => {
  // console.log("⚠️ Socket Connection Error:", err.message);
});

export default socket;