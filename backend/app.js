import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import reservationRouter from "./routes/reservationRoute.js";
import { dbConnection } from "./database/dbConnection.js";

dotenv.config({ path: "./config/config.env" });

const app = express();

// ✅ CORS configuration - MUST be before any routes
app.use(
  cors({
    origin: [
      "http://localhost:5173",           // Your local frontend
      "https://hitesh-restro.vercel.app" // Your deployed frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);

// ✅ Handle preflight requests
app.options("*", cors());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Test route (helps verify backend is working)
app.get("/", (req, res) => {
  res.json({ 
    message: "Restro API is running",
    status: "active",
    endpoints: {
      reservation: "/api/v1/reservation/send"
    }
  });
});

// ✅ Your reservation routes
app.use("/api/v1/reservation", reservationRouter);

// Error middleware
app.use(errorMiddleware);

// Database connection
dbConnection();

export default app;