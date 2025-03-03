import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    // Verificar si ya existe un usuario con ese email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Ya existe un usuario con ese email" });
    }

    // Crear y guardar el usuario
    const newUser = new User({ name, email, password, phone, role });
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login de usuario
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña son obligatorios" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar si el usuario está bloqueado
    if (user.isBlocked) {
      return res.status(403).json({ error: "Este usuario está bloqueado" });
    }

    // Comparar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Bloquear usuario (requiere rol de admin)
export const blockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    user.isBlocked = true;
    await user.save();

    res.json({ message: `Usuario ${user.name} bloqueado con éxito` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Desbloquear usuario (requiere rol de admin)
export const unblockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    user.isBlocked = false;
    await user.save();

    res.json({ message: `Usuario ${user.name} desbloqueado con éxito` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
