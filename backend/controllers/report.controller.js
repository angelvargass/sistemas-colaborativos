import Order from "../models/order.model.js";

export const getTotalRevenue = async (req, res) => {
  try {
    const revenue = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$price" } } }
    ]);
    res.json({ totalRevenue: revenue[0]?.totalRevenue || 0 });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getRevenueByAirline = async (req, res) => {
  try {
    const revenueByAirline = await Order.aggregate([
      { $group: { _id: "$airline", totalRevenue: { $sum: "$price" } } },
      { $sort: { totalRevenue: -1 } }
    ]);
    res.json(revenueByAirline);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getMostBookedAirlines = async (req, res) => {
  try {
    const bookings = await Order.aggregate([
      { $group: { _id: "$airline", totalBookings: { $sum: 1 } } },
      { $sort: { totalBookings: -1 } }
    ]);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getMostPopularRoutes = async (req, res) => {
  try {
    const popularRoutes = await Order.aggregate([
      { $group: { _id: "$route", totalBookings: { $sum: 1 } } },
      { $sort: { totalBookings: -1 } },
      { $limit: 5 }
    ]);
    res.json(popularRoutes);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAverageTicketPriceByAirline = async (req, res) => {
  try {
    const avgPrice = await Order.aggregate([
      { $group: { _id: "$airline", averagePrice: { $avg: "$price" } } },
      { $sort: { averagePrice: -1 } }
    ]);
    res.json(avgPrice);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getLongestFlights = async (req, res) => {
  try {
    const longestFlights = await Order.find().sort({ duration: -1 }).limit(5);
    res.json(longestFlights);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};