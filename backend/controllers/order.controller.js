import Order from '../models/order.model.js'

export const createOrder = async (req, res) => {
  try {
    const { flightId, airline, price, departure, arrival, duration, route } = req.body

    if (!flightId || !airline || !price || !departure || !arrival || !duration || !route) {
      return res.status(400).json({ success: false, message: 'All fields are required.' })
    }

    const newOrder = new Order({ flightId, airline, price, departure, arrival, duration, route })
    await newOrder.save()

    res.status(201).json({ success: true, message: 'Flight booked successfully!', order: newOrder })
  } catch (error) {
    console.error('Error creating order:', error)
    res.status(500).json({ success: false, message: 'Internal server error.' })
  }
}
