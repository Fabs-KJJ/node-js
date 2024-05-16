const express = require("express");
const router = express.Router();
const Registration = require("../model/Registration");

// Get a list of students from the database
router.get("/register", async (req, res) => {
    try {
        const result = await Registration.find({});
        res.send(result); // Sending the result as the response
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
