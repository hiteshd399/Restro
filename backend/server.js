import dotenv from "dotenv";
import cors from "cors";
import app from "./app.js";
import { dbConnection } from "./database/dbConnection.js";

// Load env variables FIRST
dotenv.config({ path: "./config/config.env" });

// ✅ CORS must be added BEFORE dbConnection and routes
app.use(cors({
  origin: process.env.FRONTEND_URL || "https://hitesh-restro.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Connect Database (after CORS)
dbConnection();

// Start Server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 SERVER RUNNING ON PORT ${PORT}`);
});