const express = require("express");
const router = express.Router();

function isAuth(req, res, next) {
    if (req.session.userId) return next();
    res.redirect("/login");
}

router.get("/", isAuth, (req, res) => {
    res.render("dashboard");
});

module.exports = router;
