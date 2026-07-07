const { Server } = require("socket.io");

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    pingTimeout: 60000,
    pingInterval: 25000,

    cors: {
      origin: process.env.CLIENT_URL, // Vite frontend
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`🟢 Client Connected: ${socket.id}`);

    socket.emit("connected", {
      message: "Connected to SOC Live Monitoring",
    });

    socket.on("error", (err) => {
      console.error(`Socket Error (${socket.id}):`, err.message);
    });

    socket.on("disconnect", (reason) => {
      console.log(`🔴 Client Disconnected: ${socket.id}  (${reason})`);
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