import User from '../models/users.model.js'

// Create
export const createUser = async (req, res) => {
  const user = req.body

  if (!user.name || !user.email || !user.password) {
    return res.status(400).json({ success: false, message: 'Please provide all fields.' })
  }

  const newUser = new User(user)

  try {
    await newUser.save()
    res.status(201).json({ success: true, data: newUser })
  } catch (error) {
    console.error('Error in user creation: ', error.message)
    res.status(500).json({ success: false, message: 'Server error.' })
  }
}
