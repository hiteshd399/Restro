import dotenv from "dotenv";
import cors from "cors";
import app from "./app.js";
import { dbConnection } from "./database/dbConnection.js";

// Load env variables
dotenv.config({ path: "./config/config.env" });

// Connect Database
dbConnection();

// Enable CORS (IMPORTANT)
app.use(cors({
  origin: "https://hitesh-restro.vercel.app", // your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Start Server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 SERVER RUNNING ON PORT ${PORT}`);
});