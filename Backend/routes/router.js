const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // Import jwt package
const User = require("../Models/userSchema");
const authenticateJWT = require("../middleware/authMiddleware"); // Import the middleware

// Register user
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
        res.status(422).json("Please fill all the fields");
        return;
    }

    try {
        // Check if user already exists
        const preuser = await User.findOne({ email: email });
        if (preuser) {
            res.status(422).json("This user is already present");
            return;
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const addUser = new User({
            name,
            email,
            password: hashedPassword
        });

        // Save user to the database
        await addUser.save();
        res.status(201).json(addUser);
    } catch (error) {
        res.status(422).json(error);
    }
});

//--------------------------------------------------------------------------------------




const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret"; // Store your JWT secret in .env for security


// Login user
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Check if all fields are provided
    if (!email || !password) {
        res.status(422).json("Please fill all the fields");
        return;
    }

    try {
        // Check if user exists
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(422).json("Invalid email or password");
            return;
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(422).json("Invalid email or password");
            return;
        }


        // Create JWT token
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "1h" }); // Token expires in 1 hour


        // Successful login
        // res.status(200).json({ message: "Login successful", user });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json(error);
    }
});







// Protected route
router.get("/protected", authenticateJWT, (req, res) => {
    res.status(200).json({ message: "This is protected data", user: req.user });
});


module.exports = router;
