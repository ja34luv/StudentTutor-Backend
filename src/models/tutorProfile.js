const mongoose = require("mongoose");
const validator = require("validator");

const tutorProfileSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        firstName: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        headline: { type: String, trim: true },
        experiences: {
            type: [
                {
                    title: { type: String, required: true },
                    employmentType: { type: String },
                    companyName: { type: String, required: true },
                    location: { type: String },
                    locationType: { type: String },
                    startDateMonth: { type: String, required: true },
                    startDateYear: { type: Number, required: true },
                    endDateMonth: { type: String },
                    endDateYear: { type: Number },
                    currentlyWorking: { type: Boolean },
                },
            ],
            validate: {
                validator: function (experiences) {
                    for (const experience of experiences) {
                        const hasEndDate =
                            experience.endDateYear && experience.endDateMonth;
                        const isCurrentlyWorking = experience.currentlyWorking;

                        if (
                            (hasEndDate && isCurrentlyWorking) ||
                            (!hasEndDate && !isCurrentlyWorking)
                        ) {
                            return false; // Validation fails if both conditions are met
                        }
                    }
                    return true; // Validation passes if either condition is met for each experience
                },
                message:
                    "Please provide either an end date or indicate that you are currently working.",
            },
        },
        education: {
            type: [
                {
                    school: { type: String, required: true },
                    degree: { type: String },
                    major: { type: String, required: true },
                    startDateMonth: { type: String, required: true },
                    startDateYear: { type: Number, required: true },
                    endDateMonth: { type: String, required: true },
                    endDateYear: { type: Number, required: true },
                    gpa: { type: Number },
                },
            ],
            validate: {
                validator: function (education) {
                    if (!education.length > 0)
                        throw new Error("Education information is needed.");
                },
            },
        },
    },
    {
        timestamps: true,
    }
);

const TutorProfile = mongoose.model("TutorProfile", tutorProfileSchema);

module.exports = TutorProfile;
