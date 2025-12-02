const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// Signup Page (GET)
router.get("/signup", (req, res) => {
    res.render("signup");
});

// Signup Logic (POST)
router.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    // Check Email Duplication
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.render("signup", { error: "Email already registered!" });
    }

    // Password Hashing
    const hashedPass = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashedPass });

    res.redirect("/login");
});

// Login Page (GET)
router.get("/login", (req, res) => {
    res.render("login");
});

// Login Logic (POST)
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.render("login", { error: "Invalid Credentials!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.render("login", { error: "Invalid Credentials!" });

    req.session.userId = user._id;
    res.redirect("/dashboard");
});

module.exports = router;
