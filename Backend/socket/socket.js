const { Server } = require("socket.io");

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // Vite frontend
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`🟢 Client Connected: ${socket.id}`);

    socket.emit("connected", {
      message: "Connected to SOC Live Monitoring",
    });

    socket.on("disconnect", () => {
      console.log(`🔴 Client Disconnected: ${socket.id}`);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO not initialized");
  }

  return io;
};

module.exports = {
  initializeSocket,
  getIO,
};