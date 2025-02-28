import express from 'express';
import { createOrder } from '../controllers/order.controller.js';

const router = express.Router();

// Route: /api/orders

router.post("/", createOrder);

export default router;