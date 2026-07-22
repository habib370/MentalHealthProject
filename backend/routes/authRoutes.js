const express = require("express");
const router = express.Router();

const controller = require("../controllers/authController");
const auth = require("../middleware/authMiddleware");

// AUTH routes
router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.post("/logout", controller.logout);
// PROTECTED route
router.get("/dashboard", auth, (req, res) => {
    res.json({
        message: "Dashboard data",
        user: req.user
    });
});

module.exports = router;