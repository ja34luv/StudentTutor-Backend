const express = require("express");
const auth = require("../middleware/auth");
const router = new express.Router();

// Check if the auth token is valid
router.post("/checkAuthToken", auth, async (req, res) => {
    try {
        res.status(200).send({ message: "Auth token is valid." });
    } catch (e) {
        res.status(401).send({ error: "Invalid auth token." });
    }
});

module.exports = router;
