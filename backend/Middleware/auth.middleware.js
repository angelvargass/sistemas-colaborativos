import jwt from 'jsonwebtoken'
import User from '../models/users.model.js'

// Middleware para verificar el token
export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ error: 'No se proporcionó token' })
    }
    const token = authHeader.split(' ')[1]
    if (!token) {
      return res.status(401).json({ error: 'Formato de token inválido' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId
    req.userRole = decoded.role
    next()
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' })
  }
}

// Middleware para verificar rol de admin
export const requireAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' })
    }
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'No tienes permisos de administrador' })
    }
    next()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
