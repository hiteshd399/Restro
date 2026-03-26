import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ CORS Configuration - THIS IS CRITICAL
const allowedOrigins = [
  "http://localhost:5173",           // Local developments
  "https://hitesh-restro.vercel.app" // Production frontend
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(null, true); // Temporarily allow all for testing
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// Handle preflight requests
app.options("*", cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "Restro API is running",
    status: "active",
    timestamp: new Date().toISOString()
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK",
    cors_enabled: true,
    allowed_origins: allowedOrigins
  });
});

// Your reservation routes
app.use("/api/v1/reservation", reservationRouter);

// Error middleware
app.use(errorMiddleware);

// Database connection
dbConnection();

export default app;