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

// conversationSchema.pre("deleteOne", { document: true }, async function (next) {
//     const conversation = this;
//     await Message.deleteMany({ conversation: conversation._id });
//     next();
// });

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
