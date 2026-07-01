const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const http = require("http");
const { initializeSocket } = require("./socket/socket");

const app = express();
const server = http.createServer(app);

const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const logRoutes = require("./routes/logRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const threatRoutes = require("./routes/threatRoutes");
const userRoutes = require("./routes/userRoutes");
const liveMonitoringRoutes = require("./routes/liveMonitoringRoutes");
const emailRoutes = require("./routes/emailRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/threats", threatRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reports", require("./routes/reportRoutes"));
app.use("/api/live", liveMonitoringRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/settings", settingsRoutes);

app.get("/", (req, res) => {
  res.send("SOC Log Analyzer API Running...");
});

app.get("/api/test", protect, (req, res) => {
  res.json({
    success: true,
    message: "Protected Route Accessed Successfully",
    user: req.user,
  });
});

const PORT = process.env.PORT || 5000;

initializeSocket(server);

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});