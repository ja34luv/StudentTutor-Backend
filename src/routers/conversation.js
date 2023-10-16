const express = require("express");
const Conversation = require("../models/conversation");
const auth = require("../middleware/auth");
const router = new express.Router();

// Create a new conversation
router.post("/conversations", auth, async (req, res) => {
    const conversation = new Conversation({
        members: [req.user._id, req.body.receiverId],
        tutorProfile: req.body.tutorProfile,
    });

    try {
        await conversation.save();
        res.status(200).send(conversation);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// Get conversations of a user
router.get("/conversations/me", auth, async (req, res) => {
    try {
        const conversations = await Conversation.find({
            members: { $in: [req.user._id] },
        });
        res.status(200).send(conversations);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;
