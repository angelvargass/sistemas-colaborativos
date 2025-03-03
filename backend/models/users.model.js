
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // para evitar usuarios duplicados.
    },
    password: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    // Manejo de roles y bloqueo
    role: {
      type: String,
      default: "user", // Puede ser "admin", "user", etc.
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Crea automáticamente los campos createdAt y updatedAt.
  }
);

// Hook para hashear la contraseña antes de guardar
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

export default User;
