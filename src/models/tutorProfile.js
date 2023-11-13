const mongoose = require("mongoose");

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
                    employmentType: {
                        type: String,
                        enum: [
                            "Full-Time",
                            "Part-Time",
                            "Contract",
                            "Freelance",
                            "Internship",
                            "Co-op (Cooperative Education)",
                            "Volunteer",
                            "Self-Employed",
                        ],
                    },
                    companyName: { type: String, required: true, trim: true },
                    location: { type: String, trim: true },
                    locationType: {
                        type: String,
                        enum: ["On-Site", "Remote", "Hybrid"],
                    },
                    startDateMonth: { type: String, required: true },
                    startDateYear: { type: Number, required: true },
                    endDateMonth: { type: String },
                    endDateYear: { type: Number },
                    currentlyWorking: { type: Boolean },
                },
            ],
            validate: {
                validator: function (experiences) {
                    // disable endDateMonth/endDateYear & currentlyWorking insertion at the same time.
                    for (const experience of experiences) {
                        const hasEndDate =
                            experience.endDateYear && experience.endDateMonth;
                        const hasPartialEndDate =
                            (experience.endDateYear ||
                                experience.endDateMonth) &&
                            !hasEndDate;
                        const isCurrentlyWorking = experience.currentlyWorking;

                        if (
                            (hasEndDate && isCurrentlyWorking) ||
                            (!hasEndDate && !isCurrentlyWorking) ||
                            (hasPartialEndDate && isCurrentlyWorking)
                        ) {
                            return false;
                        }
                    }
                    return true;
                },
                message:
                    "Please provide either an end date or indicate that you are currently working.",
            },
        },
        education: {
            type: [
                {
                    school: {
                        type: String,
                        required: true,
                        trim: true,
                        enum: [
                            "Simon Fraser University",
                            "University of British Columbia",
                        ],
                    },
                    degree: { type: String, trim: true },
                    major: { type: String, required: true, trim: true },
                    startDateMonth: { type: String, required: true },
                    startDateYear: { type: Number, required: true },
                    endDateMonth: { type: String, required: true },
                    endDateYear: { type: Number, required: true },
                    gpa: { type: String, trim: true },
                    currentlyAttending: { type: Boolean, required: true },
                },
            ],
            validate: {
                validator: function (education) {
                    // education information must be provided (at least one)
                    if (!education.length > 0)
                        throw new Error(
                            "Please provide an education information."
                        );

                    let foundCurrentlyAttending = false;

                    for (const entry of education) {
                        if (entry.currentlyAttending) {
                            if (foundCurrentlyAttending) {
                                throw new Error(
                                    "Only one education can have the currentlyAttending value set to be true."
                                );
                            }
                            foundCurrentlyAttending = true;
                        }
                    }

                    if (!foundCurrentlyAttending) {
                        throw new Error(
                            "Please indicate which education entry you are currently attending."
                        );
                    }
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
                    language: {
                        type: String,
                        required: true,
                        trim: true,
                        enum: [
                            "English",
                            "French",
                            "Cantonese",
                            "Mandarin",
                            "Hindustani",
                            "Spanish",
                            "Punjabi",
                            "Arabic",
                            "Tagalog",
                            "Italian",
                            "German",
                            "Portuguese",
                            "Persian",
                            "Russian",
                            "Tamil",
                            "Vietnamese",
                            "Gujarati",
                            "Polish",
                            "Korean",
                            "Serbo-Croatian",
                            "Greek",
                            "Haitian Creole",
                            "Ukrainian",
                            "Bengali",
                            "Romanian",
                            "Dutch",
                            "Cree",
                            "Japanese",
                            "Hebrew",
                            "Turkish",
                            "Malayalam",
                            "Hungarian",
                            "Ilocano",
                            "Somali",
                            "Swahili",
                            "Telugu",
                        ],
                    },
                    proficiency: {
                        type: String,
                        enum: [
                            "Native Speaker",
                            "Fluent",
                            "Advanced",
                            "Intermediate",
                            "Basic",
                            "Beginner",
                        ],
                    },
                },
            ],
            validate: {
                validator: function (languages) {
                    // language information must be provided (at least one)
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
        gender: {
            type: String,
            required: true,
            trim: true,
            enum: ["Male", "Female", "Non-Binary"],
        },
        lessonMethod: {
            type: String,
            required: true,
            enum: ["Remote", "In-Person", "Hybrid"],
        },
        lessonLocation: {
            type: String,
            trim: true,
            required: function () {
                return this.lessonMethod !== "Remote";
            },
            validate: {
                validator: function (lessonLocation) {
                    // Ignore lessonLocation when lessonMethod is "Remote"
                    if (this.lessonMethod === "Remote" && lessonLocation) {
                        this.lessonLocation = undefined;
                    }
                    return true; // Validation always passes
                },
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
        subjects: {
            type: [
                {
                    subject: { type: String, trim: true, required: true },
                    teachingLevels: {
                        type: String,
                        trim: true,
                        required: true,
                    },
                },
            ],
            validate: {
                validator: function (subjects) {
                    // subject information must be provided (at least one)
                    if (!subjects.length > 0)
                        throw new Error(
                            "Please provide a subject information."
                        );
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

// notes
// for lessonMethod & lessonLocation => if lessonMethod is remote, lessonLocation input is disabled from frontend
// endDateMonth/endDateYear & currentlyWorking => if currentlyWorking is on disable endDateMonth/endDateYear input from frontend
