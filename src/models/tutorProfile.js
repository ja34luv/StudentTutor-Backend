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
                    "Either endDateMonth and endDateYear should be filled out, or currentlyWorking should be filled out for each experience, but not both.",
            },
        },
    },
    {
        timestamps: true,
    }
);

// // Custom validation function to check endDateMonth/endDateYear and currentlyWorking
// tutorProfileSchema.path("experiences").validate(function (experiences) {
//     for (const experience of experiences) {
//         const hasEndDate = experience.endDateYear && experience.endDateMonth;
//         const isCurrentlyWorking = experience.currentlyWorking;

//         if (
//             (hasEndDate && isCurrentlyWorking) ||
//             (!hasEndDate && !isCurrentlyWorking)
//         ) {
//             return false; // Validation fails if both conditions are met
//         }
//     }
//     return true; // Validation passes if either condition is met for each experience
// }, "Either endDateMonth and endDateYear should be filled out, or currentlyWorking should be filled out for each experience, but not both.");

const TutorProfile = mongoose.model("TutorProfile", tutorProfileSchema);

module.exports = TutorProfile;
