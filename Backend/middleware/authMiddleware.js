// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Use your JWT secret here

// Middleware to check for token
const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json("Invalid or expired token");
            }

            req.user = decoded; // Set the user information in the request object
            next();
        });
    } else {
        res.status(401).json("No token provided");
    }
};

module.exports = authenticateJWT;
