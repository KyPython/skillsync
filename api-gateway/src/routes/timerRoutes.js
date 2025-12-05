import express from 'express';
import axios from 'axios';

const router = express.Router();
const TIMER_SERVICE_URL = process.env.TIMER_SERVICE_URL || 'http://localhost:8082';

router.get('*', async (req, res) => {
  try {
    const response = await axios.get(`${TIMER_SERVICE_URL}${req.originalUrl}`, {
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
    const response = await axios.post(`${TIMER_SERVICE_URL}${req.originalUrl}`, req.body, {
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
    const response = await axios.put(`${TIMER_SERVICE_URL}${req.originalUrl}`, req.body, {
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
    const response = await axios.delete(`${TIMER_SERVICE_URL}${req.originalUrl}`, {
      headers: req.headers
    });
    res.status(response.status).send();
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message
    });
  }
});

export { router as timerRoutes };

