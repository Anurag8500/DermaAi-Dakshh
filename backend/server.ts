import dotenv from 'dotenv';
import path from 'path';

// Load env variables first
dotenv.config({ path: path.join(__dirname, '.env') });

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import { protect, AuthRequest } from './middleware/authMiddleware';

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);

// Health Check Route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', port: process.env.PORT || 3000 });
});

// Protected Dashboard Route Example
app.get('/api/dashboard', protect, (req: AuthRequest, res: Response) => {
  res.json({
    message: `Welcome to the dashboard, ${req.user?.name}!`,
    user: req.user,
  });
});

// 404 handler for any non-existent API routes
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler to prevent HTML error pages
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Server Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
