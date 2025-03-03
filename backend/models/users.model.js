<<<<<<< Updated upstream
import mongoose from "mongoose";
=======
import mongoose from 'mongoo1se'
import bcrypt from 'bcrypt'
>>>>>>> Stashed changes

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
<<<<<<< Updated upstream
=======
      unique: true // para evitar usuarios duplicados.
>>>>>>> Stashed changes
    },
    password: {
      type: String,
      required: false
    },
    phone: {
<<<<<<< Updated upstream
        type: String,
        required: false,
      },
  },
  {
    timestamps: true, // createdAt, updatedAt
=======
      type: String,
      required: false
    },
    // Manejo de roles y bloqueo
    role: {
      type: String,
      default: 'user' // Puede ser "admin", "user", etc.
    },
    isBlocked: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true // Crea automáticamente los campos createdAt y updatedAt.
>>>>>>> Stashed changes
  }
)

<<<<<<< Updated upstream
const User = mongoose.model("User", userSchema);
=======
// Hook para hashear la contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

const User = mongoose.model('User', userSchema)
>>>>>>> Stashed changes

export default User
