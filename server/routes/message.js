const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const Group = require('../models/group');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('./auth');

// Send Message
router.post('/send', verifyToken, async (req, res) => {
    try {
        const { groupId, content } = req.body;
       const group = await Group.findOne({name:groupId})
      
        const message = new Message({ group: group._id, sender: req.user.userId, content });
        await message.save();
        res.status(201).send('Message sent');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Like Message
router.post('/:id/like', verifyToken, async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) return res.status(404).send('Message not found');
        message.likes.push(req.user.userId);
        await message.save();
        res.send('Message liked');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get Group Messages
router.get('/group/:groupId/messages', verifyToken, async (req, res) => {
    try {
        const groupId = req.params.groupId;
        const group = await Group.findOne({name:groupId})
        const messages = await Message.find({ group: group._id })
            .populate('sender', 'username') // Populate sender's username
            .sort({ createdAt: 'asc' }); // Sort messages by creation time

        if (!messages || messages.length === 0) {
            return res.status(404).send('No messages found for this group');
        }

        res.status(200).json(messages);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
