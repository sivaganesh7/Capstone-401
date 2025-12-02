const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();

// Database
const connectDB = require("./config/db");
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
    secret: "secret123",
    resave: false,
    saveUninitialized: false
}));

// View Engine
app.set("view engine", "ejs");

// Routes
app.use("/", require("./routes/authRoutes"));
app.use("/dashboard", require("./routes/dashboardRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
