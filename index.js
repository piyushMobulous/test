const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const dotenv = require("dotenv");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const winston = require("winston");

const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const eventRoutes = require("./src/routes/eventRoutes");
const tradeRoutes = require("./src/routes/tradeRoutes");
const adminRoutes = require("./src/routes/adminRoutes");
const { fetchLiveData } = require("./src/services/fetchDataService");
const { setupSockets } = require("./src/services/socketService");
// const authenticateUser = require("./src/middleware/authMiddleware");
// const { authenticateUser } = require("./src/middleware/authMiddleware");
const { authenticateUser, adminOnly } = require("./src/middleware/authMiddleware");



dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

connectDB();
setupLogging();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", authenticateUser, eventRoutes);
app.use("/api/trades", authenticateUser, tradeRoutes);
app.use("/api/admin", authenticateUser, adminRoutes);

// WebSocket Setup
setupSockets(io);
setInterval(fetchLiveData, 30000);

app.use((req, res) => {
    res.json({
      error: "404",
      message: "Route you were looking for was not found",
    });
  });

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

function setupLogging() {
    const logger = winston.createLogger({
        level: "info",
        format: winston.format.json(),
        transports: [
            new winston.transports.File({ filename: "logs/error.log", level: "error" }),
            new winston.transports.File({ filename: "logs/combined.log" })
        ]
    });
    if (process.env.NODE_ENV !== "production") {
        logger.add(new winston.transports.Console({ format: winston.format.simple() }));
    }
}


