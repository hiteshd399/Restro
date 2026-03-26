import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

// CORS configuration
app.use(cors({
  origin: ["https://hitesh-restro.vercel.app", "http://localhost:5173"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Restaurant API is running!' });
});

// Reservation route
app.post('/api/v1/reservation/send', (req, res) => {
  console.log('Reservation received:', req.body);
  
  const { firstName, lastName, email, phone, date, time } = req.body;
  
  res.status(200).json({ 
    success: true, 
    message: 'Reservation received successfully!',
    data: { firstName, lastName, email, phone, date, time }
  });
});

const PORT = process.env.PORT || 4000;

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  });