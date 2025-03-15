// index.js
import express from 'express';
import mongoose from 'mongoose';
import ErrorHandler, { handleMongoError, handleJWTError, handleJWTExpiredError } from './utilis/ErrorHandler.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/user.route.js';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_SECRETE_KEY,
});

const app = express();
app.use(express.json({ limit: "50mb" })); // Limit for large file uploads


app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://horizon-impact-fund-managers-dv8d.vercel.app',
    'https://horizon-impact-fund-managers.vercel.app',
    "https://horizon-impact-fund-managers-7pt1ic2qv.vercel.app/",

  ],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
// Allow headers in response
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin); // 👈 Dynamic origin handling
  res.header("Access-Control-Allow-Credentials", "true"); // 👈 Important for cookies
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});










// Connect to MongoDB
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// API Routes
app.use("/server/v1", userRouter);

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Server is running' });
});

// Unknown Routes
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Cannot find ${req.originalUrl} on this server!`, 404));
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);  // Log the full error object

  // Handle MongoDB errors
  if (err.name === 'MongoError' || err.name === 'ValidationError') {
    err = handleMongoError(err);
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    err = handleJWTError();
  }
  if (err.name === 'TokenExpiredError') {
    err = handleJWTExpiredError();
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
