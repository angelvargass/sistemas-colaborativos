import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    flightId: { type: String, required: true }, // Flight ID stored here
    airline: { type: String, required: true },
    price: { type: Number, required: true },
    departure: { type: String, required: true },
    arrival: { type: String, required: true },
    duration: { type: String, required: true },
    route: { type: String, required: true },
    status: { type: String, default: "Pending" }, // Status of the booking
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const Order = mongoose.model("Order", orderSchema);
export default Order;