// ./routes/users.js

const express = require('express');
const router = express.Router();
const User = require('../models/users_Model');

// Middleware function example
const exampleMiddleware = (req, res, next) => {
  console.log('Middleware for /api/users');
  next();
};

// Route to get all users
router.get('/', exampleMiddleware, async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json({ data: allUsers });
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get a specific user by ID
router.get('/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    res.json({ message: `Get user with ID ${userId}`, data: user });
  } catch (error) {
    console.error(`Error getting user with ID ${userId}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create a new user
router.post('/', async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await User.create(userData);
    res.status(201).json({ message: 'User created successfully', data: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to update a user by ID
router.put('/:userId', async (req, res) => {
  const userId = req.params.userId;
  const updatedUserData = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });
    res.json({ message: `Update user with ID ${userId}`, data: updatedUser });
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to delete a user by ID
router.delete('/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.json({ message: `Delete user with ID ${userId}` });
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
