const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

const adminOnly = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== "admin") return res.status(403).json({ message: "Access Denied" });
        next();
    } catch (error) {
        res.status(500).json({ message: "Authorization Error", error });
    }
};

module.exports = { authenticateUser, adminOnly };
