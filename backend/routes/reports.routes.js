import express from "express";
import {
  getTotalRevenue,
  getRevenueByAirline,
  getMostBookedAirlines,
  getMostPopularRoutes,
  getAverageTicketPriceByAirline,
  getLongestFlights
} from "../controllers/report.controller.js";

const router = express.Router();

router.get("/total-revenue", getTotalRevenue);
router.get("/revenue-by-airline", getRevenueByAirline);
router.get("/most-booked-airlines", getMostBookedAirlines);
router.get("/most-popular-routes", getMostPopularRoutes);
router.get("/average-ticket-price", getAverageTicketPriceByAirline);
router.get("/longest-flights", getLongestFlights);

export default router;