const express = require("express");
const Message = require("../models/message");
const Conversation = require("../models/conversation");
const auth = require("../middleware/auth");
const router = new express.Router();

// Create a new message
router.post("/messages", auth, async (req, res) => {
    const { conversation, text } = req.body;

    try {
        const existingConversation = await Conversation.findById(conversation);
        if (!existingConversation) {
            return res.status(404).send("Conversation not found.");
        }

        if (!existingConversation.members.includes(req.user._id)) {
            return res
                .status(403)
                .send("You are not a member of this conversation.");
        }

        const message = new Message({
            conversation,
            sender: req.user._id,
            text,
        });

        await message.save();
        res.status(200).send(message);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// Read messages
router.get("/messages/:id", auth, async (req, res) => {
    try {
        // Find the conversation
        const conversation = await Conversation.findById(req.params.id);

        // Check if the conversation exists
        if (!conversation) {
            return res.status(404).send("Conversation not found.");
        }

        // Check if the authenticated user is a member of the conversation
        if (!conversation.members.includes(req.user._id)) {
            return res
                .status(403)
                .send("You are not a member of this conversation.");
        }

        // Find messages for the specified conversation
        const messages = await Message.find({
            conversation: req.params.id,
        });

        res.status(200).send(messages);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;
