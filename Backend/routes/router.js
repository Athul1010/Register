const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../Models/userSchema");

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

        // Successful login
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json(error);
    }
});





module.exports = router;
