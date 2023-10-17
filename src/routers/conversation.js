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
        const existingConversation = await Conversation.findOne({
            members: {
                $all: [req.user._id, req.body.receiverId],
            },
        });

        if (existingConversation) {
            throw new Error(
                "A conversation with these members already exists."
            );
        }

        await conversation.save();
        res.status(200).send(conversation);
    } catch (e) {
        console.log("erorr:", e.message);
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
