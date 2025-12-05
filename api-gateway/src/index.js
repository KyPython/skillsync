import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { taskRoutes } from './routes/taskRoutes.js';
import { goalRoutes } from './routes/goalRoutes.js';
import { timerRoutes } from './routes/timerRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'api-gateway' });
});

// Service routes
app.use('/api/tasks', taskRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/timers', timerRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'SkillSync API Gateway',
    version: '1.0.0',
    services: {
      tasks: '/api/tasks',
      goals: '/api/goals',
      timers: '/api/timers'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    status: err.status || 500
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path
  });
});

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
  console.log(`📡 Task Service: ${process.env.TASK_SERVICE_URL || 'http://localhost:8080'}`);
  console.log(`📡 Goals Service: ${process.env.GOALS_SERVICE_URL || 'http://localhost:5001'}`);
  console.log(`📡 Timer Service: ${process.env.TIMER_SERVICE_URL || 'http://localhost:8082'}`);
});

