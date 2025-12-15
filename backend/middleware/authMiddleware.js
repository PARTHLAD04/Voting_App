const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).send({ message: "Access denied. No token provided." });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send({ message: "Invalid token." });
    }
};

const signToken = (user) => {
    return jwt.sign(
        user,
        process.env.JWT_SECRET,
    );
};

module.exports = {
    authMiddleware,
    signToken
};



