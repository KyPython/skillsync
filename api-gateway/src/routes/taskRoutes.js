import express from 'express';
import axios from 'axios';

const router = express.Router();
const TASK_SERVICE_URL = process.env.TASK_SERVICE_URL || 'http://localhost:8080';

// Proxy all task routes to task service
router.get('*', async (req, res) => {
  try {
    const response = await axios.get(`${TASK_SERVICE_URL}${req.originalUrl}`, {
      headers: req.headers
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message
    });
  }
});

router.post('*', async (req, res) => {
  try {
    const response = await axios.post(`${TASK_SERVICE_URL}${req.originalUrl}`, req.body, {
      headers: req.headers
    });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message
    });
  }
});

router.put('*', async (req, res) => {
  try {
    const response = await axios.put(`${TASK_SERVICE_URL}${req.originalUrl}`, req.body, {
      headers: req.headers
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message
    });
  }
});

router.delete('*', async (req, res) => {
  try {
    const response = await axios.delete(`${TASK_SERVICE_URL}${req.originalUrl}`, {
      headers: req.headers
    });
    res.status(response.status).send();
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message
    });
  }
});

export { router as taskRoutes };

