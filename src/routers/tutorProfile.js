const express = require("express");
const router = new express.Router();
const TutorProfile = require("../models/tutorProfile");
const auth = require("../middleware/auth");

// const tutorProfilE = await TutorProfile.findById(
//     "650b6fbd3a80d61ed6840500"
// )
//     .populate("owner")
//     .exec();
// await tutorProfilE.populate("owner").exec();
// console.log(tutorProfilE.owner);

// Testing
router.post("/tutorProfiles/test", async (req, res) => {
    const tutorProfile = new TutorProfile(req.body);

    try {
        await tutorProfile.save();
        res.status(201).send(tutorProfile);
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
});

// Create tutorProfiile
router.post("/tutorProfiles", auth, async (req, res) => {
    const tutorProfile = new TutorProfile({ ...req.body, owner: req.user._id });

    try {
        await tutorProfile.save();
        res.status(201).send(tutorProfile);
    } catch (e) {
        res.status(400).send(e);
    }
});

function decodeQueryParam(req, paramName) {
    if (req.query[paramName]) {
        return decodeURIComponent(req.query[paramName]);
    }

    return null;
}

// Read user's tutorProfiles (Get my tutor profiles)
//GET /tutorProfiles/me?sortBy=createdAt:desc (or asc)
router.get("/tutorProfiles/me", auth, async (req, res) => {
    const sort = {};

    const sortBy = decodeQueryParam(req, "sortBy");

    if (sortBy) {
        const parts = sortBy.split(":");
        sort[parts[0]] = parts[1] == "desc" ? -1 : 1;
    }

    try {
        await req.user.populate({
            path: "tutorProfiles",
            options: {
                sort,
            },
        });

        res.send(req.user.tutorProfiles);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Read tutorProfiles (General search)
//GET /tutorProfiles?sortBy=createdAt:desc (or asc)
//GET /tutorProfiles?school=Simon%20Fraser%20University
//GET /tutorProfiles?language=Korean
//GET /tutorProfiles?hourlyRate=≤$25.00/hour
//GET /tutorProfiles?sex=Male
//GET /tutorProfiles?lessonMethod=Remote
//GET /tutorProfiles?what=full-stack development
//GET /tutorProfiles?where=coquitlam
router.get("/tutorProfiles", async (req, res) => {
    const sort = {};
    const match = {};
    const andConditions = [];

    const sortBy = decodeQueryParam(req, "sortBy");
    const school = decodeQueryParam(req, "school");
    const language = decodeQueryParam(req, "language");
    const hourlyRate = decodeQueryParam(req, "hourlyRate");
    const sex = decodeQueryParam(req, "sex");
    const lessonMethod = decodeQueryParam(req, "lessonMethod");
    const what = decodeQueryParam(req, "what")?.trim();
    const where = decodeQueryParam(req, "where")?.trim();

    if (sortBy) {
        const parts = sortBy.split(":");
        sort[parts[0]] = parts[1] == "desc" ? -1 : 1;
    }

    if (school) {
        match["education.school"] = school;
    }

    if (language) {
        match["languages.language"] = language;
    }

    if (hourlyRate) {
        const regex = /\$(\d+\.\d+)/;
        match["hourlyRate"] = { $lte: hourlyRate.match(regex)[1] };
    }

    if (sex) {
        match["sex"] = sex;
    }

    if (lessonMethod) {
        match["lessonMethod"] = lessonMethod;
    }

    if (what) {
        const fieldsToSearch = [
            "headline",
            "experiences.title",
            "education.major",
            "skills.skill",
            "aboutMe",
            "aboutLesson",
            "subjects.subject",
        ];

        const whatConditions = fieldsToSearch.map((field) => ({
            [field]: { $regex: new RegExp(what, "i") },
        }));

        andConditions.push({ $or: whatConditions });
    }

    if (where) {
        const fieldsToSearch = ["lessonLocation", "lessonMethod"];

        const whereConditions = fieldsToSearch.map((field) => ({
            [field]: { $regex: new RegExp(where, "i") },
        }));

        andConditions.push({ $or: whereConditions });
    }

    if (andConditions.length > 0) {
        match.$and = andConditions;
    }

    try {
        const tutorProfiles = await TutorProfile.find(match).sort(sort);

        res.send(tutorProfiles);
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

module.exports = router;

// How to work with spaces in the url query
// Frontend
// // Make the GET request using the encodedSchoolName as a parameter
// fetch(`/api/your-endpoint?school=${encodedSchoolName}`)
//   .then(response => response.json())
//   .then(data => {
//     // Handle the response data
//   })
//   .catch(error => {
//     // Handle errors
//   });

// Backend
// const express = require('express');
// const app = express();

// app.get('/api/your-endpoint', (req, res) => {
//   const schoolName = decodeURIComponent(req.query.school);

//   // Now schoolName contains the original value "Simon Fraser University"
//   // You can use it in your backend logic
// });
