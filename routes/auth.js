const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Assuming a MongoDB User model
const router = express.Router();

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful", user: user.email });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
