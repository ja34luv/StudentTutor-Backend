const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
    {
        members: {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
            ],
            required: true,
            validate: [
                function (members) {
                    return members.length >= 2;
                },
                "A conversation must have at least two members.",
            ],
        },
        tutorProfile: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "TutorProfile",
        },
    },
    { timestamps: true }
);

conversationSchema.index({ members: 1 }, { unique: true });

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
