import dotenv from "dotenv";
import app from "./app.js";  // Import from current directory (./app.js, not ./app)

// Load environment variables
dotenv.config({ path: "./config/config.env" });

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:5173, https://hitesh-restro.vercel.app'}`);
});