const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {verifyToken} = require('./auth')

// Middleware to check admin role
const isAdmin = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secret');
    if (decoded.role !== 'admin') {
        return res.status(403).send('Access denied');
    }
    next();
};

// Create User
router.post('/user', isAdmin, async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const user = new User({ username, password, role });
        
        await user.save();
        res.status(201).send('User created');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Edit User
router.put('/user/:id', isAdmin, async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const user = await User.findById(req.params.id);
        if (username) user.username = username;
        if (password) user.password = password;
        if (role) user.role = role;
        await user.save();
        res.send('User updated');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get all users except the current logged-in user
router.get('/all-users', verifyToken, async (req, res) => {
    try {
        const userId = req.user.userId; // Get logged-in user's ID from the verified token
        
        // Query to find all users except the logged-in user
        const users = await User.find({ _id: { $ne: userId } }, 'username role'); // Exclude password field for security
        
        res.status(200).json(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
});



module.exports = router;
