import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors' // Import CORS
import { connectDB } from './config/db.js'
import productRoutes from './routes/product.route.js'
import userRoutes from './routes/user.route.js'
import flightRoutes from './routes/flight.route.js'
import orderRoutes from './routes/order.route.js'
import reportRoutes from "./routes/reports.routes.js";

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

const __dirname = path.resolve()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/flights', flightRoutes)
app.use('/api/orders', orderRoutes)
app.use("/api/reports", reportRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  })
}

app.listen(PORT, () => {
  connectDB()
  console.log('Server started at http://localhost:' + PORT)
})
