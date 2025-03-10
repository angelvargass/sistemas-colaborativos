import express from 'express'
import { createUser } from '../controllers/user.controller.js'

const router = express.Router()

// Route: /api/users

router.post('/', createUser)

export default router
