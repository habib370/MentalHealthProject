const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* SIGNUP */
exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const exist = await User.findOne({ email });

        if (exist) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password: hash
        });

        return res.status(201).json({
            message: "User created successfully"
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server error"
        });
    }
};

/* LOGIN */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid email"
            });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({
                message: "Wrong password"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax"
        });

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server error"
        });
    }
};
exports.logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    });

    return res.status(200).json({
        message: "Logged out successfully"
    });
};