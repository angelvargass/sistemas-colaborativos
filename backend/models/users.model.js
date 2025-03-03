import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: false
    },
    phone: {
      type: String,
      required: false
    },
    role: {
      type: String,
      default: 'user'
    },
    isBlocked: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true // createdAt, updatedAt
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  try {
    const salt = await bcrypt.genSalt(process.env.SALT || 10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

const User = mongoose.model("User", userSchema)

export default User
