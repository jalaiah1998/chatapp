const express = require('express');
const router = express.Router();
const Group = require('../models/group');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {verifyToken} = require('./auth')

//create group
router.post('/create-group', verifyToken, async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user.userId; // Extract userId from the verified token (creator of the group)
        
        // Create new group and add the creator as the first member
        const group = new Group({ 
            name,
            members: [userId] // Add the creator as the first member
        });

        await group.save();
        res.status(201).send('Group created and creator added as a member');
    } catch (error) {
        res.status(400).send(error.message);
    }
});


// Add Member
router.post('/:groupId/members', verifyToken, async (req, res) => {
    try {
        const { userId } = req.body;
        const group = await Group.findOne({name:req.params.groupId});
        const user = await User.findById(userId);
        if (!group || !user) return res.status(404).send('Group or User not found');
        group.members.push(user);
        await group.save();
        res.send('Member added');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Get All Groups the Logged-in User is a Member of
router.get('/my-groups', verifyToken, async (req, res) => {
    try {
        const userId = req.user.userId; // Extract the user ID from the verified token
        const groups = await Group.find({ members: userId }).populate('members', 'username');
       
        res.json(groups);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete Group
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Group.findByIdAndDelete(req.params.id);
        res.send('Group deleted');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
