const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const router = express.Router();

// User Registration Route
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user in the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response with the token
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// User Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the password with the hashed password stored in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response with the token
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/me', async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];  // Extract token from header
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, 'your_jwt_secret');
      const user = await User.findById(decoded.userId);  // Get the user from the database
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      
      // Send the user details back
      res.status(200).json({ name: user.name, email: user.email });
    } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
    }
  });
  

module.exports = router;
