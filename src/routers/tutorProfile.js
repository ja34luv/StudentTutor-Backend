const express = require("express");
const router = new express.Router();
const TutorProfile = require("../models/tutorProfile");

// Testing
router.post("/tutorProfiles", async (req, res) => {
    const tutorProfile = new TutorProfile(req.body);

    try {
        await tutorProfile.save();
        res.status(201).send(tutorProfile);
    } catch (e) {
        res.status(400).send(e);
        console.log(e);
    }
});

module.exports = router;
