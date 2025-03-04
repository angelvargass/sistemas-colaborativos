import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: false
    },
    phone: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true // createdAt, updatedAt
  }
)

const User = mongoose.model('User', userSchema)

export default User
