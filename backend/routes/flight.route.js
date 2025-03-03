import express from 'express'
import { getFlights } from '../controllers/flights.controller.js'

const router = express.Router()

// Route: /api/flights

router.get('/', getFlights)

export default router
