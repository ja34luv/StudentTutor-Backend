const express = require("express");
const router = new express.Router();
const TutorProfile = require("../models/tutorProfile");
const auth = require("../middleware/auth");
const User = require("../models/user");

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
router.get("/tutorProfiles", async (req, res) => {});

module.exports = router;
