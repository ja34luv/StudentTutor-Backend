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
                    title: { type: String, required: true, trim: true },
                    employmentType: { type: String }, //enum
                    companyName: { type: String, required: true, trim: true },
                    location: { type: String, trim: true },
                    locationType: { type: String }, //enum
                    startDateMonth: {
                        type: String,
                        required: true,
                    },
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
                    school: { type: String, required: true, trim: true },
                    degree: { type: String, trim: true },
                    major: { type: String, required: true, trim: true },
                    startDateMonth: { type: String, required: true },
                    startDateYear: { type: Number, required: true },
                    endDateMonth: { type: String, required: true },
                    endDateYear: { type: Number, required: true },
                    gpa: { type: Number, trim: true },
                },
            ],
            validate: {
                validator: function (education) {
                    if (!education.length > 0)
                        throw new Error(
                            "Please provide an education information."
                        );
                },
            },
        },
        skills: {
            type: [
                {
                    skill: { type: String, required: true, trim: true },
                },
            ],
        },
        languages: {
            type: [
                {
                    language: { type: String, required: true, trim: true },
                    proficiency: { type: String },
                },
            ],
            validate: {
                validator: function (languages) {
                    if (!languages.length > 0)
                        throw new Error(
                            "Please provide a language information."
                        );
                },
            },
        },
        hourlyRate: {
            type: Number,
            required: true,
            trim: true,
        },
        avatar: { type: Buffer },
        sex: { type: String, required: true, trim: true }, //enum
        lessonMethod: { type: String, required: true }, //enum
        lessonLocation: {
            type: String,
            trim: true,
            required: function () {
                // Use a function to conditionally set the 'required' property based on lessonMethod
                return this.lessonMethod !== "remote";
            },
        },
        aboutMe: {
            type: String,
            required: true,
        },
        aboutLesson: {
            type: String,
            required: true,
        },
        subjectsOffered: {
            type: [
                {
                    subject: { type: String, trim: true, required: true },
                    teachingLevels: { type: String, trim: true },
                },
            ],
        },
    },
    {
        timestamps: true,
    }
);

const TutorProfile = mongoose.model("TutorProfile", tutorProfileSchema);

module.exports = TutorProfile;

// notes
// for lessonMethod & lessonLocation => if lessonMethod is remote, lessonLocation input is disabled from frontend
//endDateMonth/endDateYear & currentlyWorking => if currentlyWorking is on disable endDateMonth/endDateYear input from frontend
