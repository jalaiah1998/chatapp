const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// In-memory blacklist (for simplicity)
let tokenBlacklist = [];

// Register
router.post('/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const user = new User({ username, password, role });
        await user.save();
        res.status(201).send('User created');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, 'secret', { expiresIn: '1h' });
        res.json({ token, user });
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Logout
router.post('/logout', (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Extract the token from the Authorization header
        tokenBlacklist.push(token); // Add the token to the blacklist
        res.status(200).send('Logged out successfully');
    } catch (error) {
        res.status(400).send('Error logging out');
    }
});

// Middleware to check token validity and blacklist
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    if (tokenBlacklist.includes(token)) {
        return res.status(401).send('Invalid token. Please log in again.');
    }

    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded; // Add user info to request object
        next();
    } catch (error) {
        return res.status(400).send('Invalid token');
    }
};

//profile api
router.get('/profile', verifyToken, async(req,res)=>{
    try{
        const userId = req.user.userId
      
        const user = await User.findOne({_id: userId });
      
        if(user){
            return res.status(200).send(user)
        }
        return res.status(404).send('User not found!')

    }catch{
        res.status(500).send('Internal Server Error');
    }
})

module.exports = { router, verifyToken };
