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

// Read user's tutorProfiles (Get my tutor profiles)
//GET /tutorProfiles/me?sortBy=createdAt:desc (or asc)
router.get("/tutorProfiles/me", auth, async (req, res) => {
    const sort = {};

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(":");
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
router.get("/tutorProfiles", async (req, res) => {
    const sort = {};
    const match = {};

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(":");
        sort[parts[0]] = parts[1] == "desc" ? -1 : 1;
    }

    if (req.query.school) {
        match["education.school"] = decodeURIComponent(req.query.school);
    }

    if (req.query.language) {
        match["languages.language"] = decodeURIComponent(req.query.language);
    }

    if (req.query.hourlyRate) {
        const regex = /\$(\d+\.\d+)/;
        const hourlyRate = decodeURIComponent(req.query.hourlyRate).match(
            regex
        )[1];
        match["hourlyRate"] = { $lte: hourlyRate };
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
